import {ForwardGeocodeItem, ForwardGeocodeResult, GeoConfig, GeoProvider} from '../../geo.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class MapboxGeoProvider implements GeoProvider {

  private mapboxAccessToken: string;

  constructor(private http: HttpClient) {
  }

  init(config: GeoConfig) {
    this.mapboxAccessToken = config.properties && config.properties.mapbox && config.properties.mapbox.accessToken;
  }

  forwardGeocode(placeName: string): Observable<ForwardGeocodeResult> {
    if (this.mapboxAccessToken) {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${placeName}.json?access_token=${this.mapboxAccessToken}`;
      return this.http.get(url).map((res: any) => {
        return <ForwardGeocodeResult>{
          name: placeName,
          items: res.features.map((feature: any) => {
            return <ForwardGeocodeItem>{
              name: feature.place_name,
              center: feature.center,
              bbox: feature.bbox
            };
          })
        };
      });
    } else {
      return Observable.of(null);
    }
  }

  staticImageUrl(lng: number, lat: number, zoom: number, width: number, height: number): Observable<string> {
    return Observable.of(
      `https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/${lng},${lat},${zoom}/${width}x${height}?access_token=${this.mapboxAccessToken}`
    );
  }
}
