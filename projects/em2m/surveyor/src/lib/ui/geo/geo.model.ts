import {Observable} from "rxjs/Observable";

export interface GeoConfig {
  provider: string;
  properties: { [key: string]: any };
}

export interface GeoProvider {
  init?(config: GeoConfig);
  forwardGeocode(placeName: string): Observable<ForwardGeocodeResult>;
  staticImageUrl(lng: number, lat: number, zoom: number, width: number, height: number): Observable<string>;
}

export abstract class GeoConfigResolver {
  abstract resolve(): Observable<GeoConfig>;
}

export interface ForwardGeocodeItem {
  name: string;
  center: Array<number>;
  bbox?: Array<number>;
}

export interface ForwardGeocodeResult {
  name: string;
  items: Array<ForwardGeocodeItem>;
}
