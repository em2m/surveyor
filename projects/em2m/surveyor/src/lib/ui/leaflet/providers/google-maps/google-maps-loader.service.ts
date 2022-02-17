
import {of, Observable} from 'rxjs';
import {concatMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class GoogleMapsLoaderService {

  private isLoaded = false;

  constructor() {}

  loadApi(apiKey: string): Observable<boolean> {
    if (!this.isLoaded) {
      this.isLoaded = true;

      return this.loadScript(`https://maps.googleapis.com/maps/api/js?v=3.45&key=${apiKey}`).pipe(
        concatMap(() => {
          return this.loadScript('https://unpkg.com/leaflet.gridlayer.googlemutant@0.10.0/Leaflet.GoogleMutant.js');
        }));
    } else {
      return of(true);
    }
  }

  private loadScript(scriptUrl: string): Observable<boolean> {
    return Observable.create(observer => {
      const script: any = document.createElement('script');

      if (script.readyState) {  // IE
        script.onreadystatechange = () => {
          if (script.readyState === 'loaded' || script.readyState === 'complete') {
            script.onreadystatechange = null;
            observer.next(true);
            observer.complete();
          }
        };
      } else {  // Others
        script.onload = function() {
            observer.next(true);
            observer.complete();
        };
      }

      script.src = scriptUrl;
      script.type = 'text/javascript';
      script.async = false;
      script.charset = 'utf-8';

      console.log('head is' + document.getElementsByTagName('head')[0]);
      document.getElementsByTagName('head')[0].appendChild(script);
    });
  }
}
