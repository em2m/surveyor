
import {of as observableOf, Observable} from 'rxjs';

import {map, mergeMap} from 'rxjs/operators';
import {Injectable, Injector} from '@angular/core';
import {ForwardGeocodeResult, GeoConfig, GeoConfigResolver, GeoProvider} from './geo.model';
import {ExtensionService} from '../../core/extension/extension.service';

@Injectable()
export class GeoService {

  private static GEO_PROVIDER_WIDGET_TYPE = 'surveyor:geo-provider';

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
    return this.resolveProvider().pipe(
      mergeMap(geoProvider => {
        if (this.geoProvider) {
          return this.geoProvider.forwardGeocode(placeName);
        } else {
          return observableOf(null);
        }
      }));
  }

  staticImageUrl(lng: number, lat: number, zoom: number, width: number, height: number): Observable<string> {
    return this.resolveProvider().pipe(
      mergeMap(() => {
        if (this.geoProvider) {
          return this.geoProvider.staticImageUrl(lng, lat, zoom, width, height);
        } else {
          return observableOf(null);
        }
      }));
  }

  staticGeojsonImageUrl(geojson: any, width: number, height: number): Observable<string> {
    return this.resolveProvider().pipe(
      mergeMap(() => {
        if (this.geoProvider) {
          //return this.geoProvider.staticImageUrl(lng, lat, zoom, width, height);
        } else {
          return observableOf(null);
        }
      }));
  }

  private resolveProvider(): Observable<GeoProvider> {
    if (this.geoProvider) {
      return observableOf(this.geoProvider);
    } else {
      return this.getConfig().pipe(
        map((config: GeoConfig) => {
          this.geoProvider = null;
          for (const extension of this.extensionService.getExtensionsForType(GeoService.GEO_PROVIDER_WIDGET_TYPE)) {
            if (extension && extension.config && extension.config['type'] === config.provider) {
              this.geoProvider = this.injector.get(extension.value) as GeoProvider;
              this.geoProvider.init(config);
              break;
            }
          }
          return this.geoProvider;
        }));
    }
  }
}
