import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/observable/of";

@Injectable()
export class GoogleMapsLoaderService {

  private isLoaded = false;

  constructor() {}

  loadApi(apiKey: string): Observable<boolean> {
    if (!this.isLoaded) {
      this.isLoaded = true;

      return this.loadScript(`https://maps.googleapis.com/maps/api/js?key=${apiKey}`)
        .flatMap(() => {
          return this.loadScript('https://unpkg.com/leaflet.gridlayer.googlemutant@latest/Leaflet.GoogleMutant.js');
        });
    } else {
      return Observable.of(true);
    }
  }

  private loadScript(scriptUrl: string): Observable<boolean> {
    return Observable.create(observer => {

      let script: any = document.createElement('script');

      if (script.readyState) {  // IE
        script.onreadystatechange = () => {
          if (script.readyState === "loaded" || script.readyState === "complete") {
            script.onreadystatechange = null;
            observer.next(true);
          }
        };
      } else {  // Others
        script.onload = function() {
          observer.next(true);
        };
      }

      script.src = scriptUrl;
      script.type = 'text/javascript';

      document.getElementsByTagName('head')[0].appendChild(script);
    });
  }
}
