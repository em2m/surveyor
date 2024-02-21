
import {of as observableOf, Observable} from 'rxjs';
import {ForwardGeocodeItem, ForwardGeocodeResult, GeoConfig, GeoProvider} from '../../geo.model';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ContextService} from '../../../../core/extension/context.service';



@Injectable()
export class MapboxGeoProvider implements GeoProvider {

  private mapboxAccessToken: string;

  constructor(private http: HttpClient, private ctx: ContextService) {
  }

  init(config: GeoConfig) {
    const brand = this.ctx.getValue('brand:loaded');
    this.mapboxAccessToken = brand?.settings?.maps?.mapboxKey || config?.properties?.mapbox?.accessToken;
  }

  forwardGeocode(placeName: string): Observable<ForwardGeocodeResult> {
    if (this.mapboxAccessToken) {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${placeName}.json?access_token=${this.mapboxAccessToken}`;
      return this.http.get(url).pipe(map((res: any) => {
        return {
          name: placeName,
          items: res.features.map((feature: any) => {
            return {
              name: feature.place_name,
              center: feature.center,
              bbox: feature.bbox
            };
          })
        };
      }));
    } else {
      return observableOf(null);
    }
  }

  staticImageUrl(lng: number, lat: number, zoom: number, width: number, height: number): Observable<string> {
    return observableOf(
      `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${lng},${lat},${zoom}/${width}x${height}?access_token=${this.mapboxAccessToken}`
    );
  }
}
