import {Injectable, Injector} from "@angular/core";
import {ExtensionService} from "../..";
import {ForwardGeocodeResult, GeoConfig, GeoConfigResolver, GeoProvider} from "./geo.model";
import {Observable} from "rxjs/Observable";

@Injectable()
export class GeoService {

  private static GEO_PROVIDER_WIDGET_TYPE = "surveyor:geo-provider";

  private geoProvider?: GeoProvider;

  constructor(private injector: Injector,
              private extensionService: ExtensionService,
              private configResolver: GeoConfigResolver) {}

  getConfig(): Observable<GeoConfig> {
    if (!this.configResolver) {
      return null;
    }
    return this.configResolver.resolve();
  }

  forwardGeocode(placeName: string): Observable<ForwardGeocodeResult> {
    return this.resolveProvider()
      .flatMap(geoProvider => {
        if (this.geoProvider) {
          return this.geoProvider.forwardGeocode(placeName);
        } else {
          return Observable.of(null);
        }
      });
  }

  staticImageUrl(lng: number, lat: number, zoom: number, width: number, height: number): Observable<string> {
    return this.resolveProvider()
      .flatMap(() => {
        if (this.geoProvider) {
          return this.geoProvider.staticImageUrl(lng, lat, zoom, width, height);
        } else {
          return Observable.of(null);
        }
      });
  }

  private resolveProvider(): Observable<GeoProvider> {
    if (this.geoProvider) {
      return Observable.of(this.geoProvider);
    } else {
      return this.getConfig()
        .map((config: GeoConfig) => {
          this.geoProvider = null;
          for (let extension of this.extensionService.getExtensionsForType(GeoService.GEO_PROVIDER_WIDGET_TYPE)) {
            if (extension && extension.config && extension.config["type"] === config.provider) {
              this.geoProvider = this.injector.get(extension.value) as GeoProvider;
              this.geoProvider.init(config);
              break;
            }
          }
          return this.geoProvider;
        });
    }
  }
}
