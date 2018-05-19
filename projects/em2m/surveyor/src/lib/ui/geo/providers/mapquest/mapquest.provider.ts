import {ForwardGeocodeItem, ForwardGeocodeResult, GeoConfig, GeoProvider} from "../../geo.model";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class MapquestGeoProvider implements GeoProvider {

  private mapquestKey: string;
  private baseUrl = "https://www.mapquestapi.com/staticmap/v4/getmap";

  constructor(private http: HttpClient) {}

  init(config: GeoConfig) {
    this.mapquestKey = config.properties && config.properties.mapquest && config.properties.mapquest.consumerKey;
  }

  forwardGeocode(placeName: string): Observable<ForwardGeocodeResult> {
    if (this.mapquestKey) {
      let url = `https://www.mapquestapi.com/geocoding/v1/address?key=${this.mapquestKey}&inFormat=kvp&outFormat=json&location=${placeName}`;
      return this.http.get(url).map((res: any) => {
        return <ForwardGeocodeResult>{
          name: placeName,
          items: res.results.map((item: any) => {
            let loc = item.locations[0];

            return <ForwardGeocodeItem>{
              name: [loc.street, loc.adminArea5, loc.adminArea3, loc.adminArea1].filter(val => val && val.length > 0).join(", "),
              center: [item.latLng.lat, item.latLng.lng]
            };
          })
        };
      });
    } else {
      return Observable.of(null);
    }
  }

  staticImageUrl(lng: number, lat: number, zoom: number, width: number, height: number): Observable<string> {
    return Observable.of(`${this.baseUrl}?key=${this.mapquestKey}&size=${width},${height}` +
      `&type=map&zoom=${zoom}&scalebar=false&traffic=false&center=${lat},${lng}`);
  }
}
