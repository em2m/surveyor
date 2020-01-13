
import {concatMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Observable, from, of} from 'rxjs';

@Injectable()
export class AppleMapkitLoaderService {

  private isLoaded = false;

  constructor() {}

  loadApi(): Observable<boolean> {
    if (!this.isLoaded) {
      this.isLoaded = true;

      return this.loadScript('https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js').pipe(
        concatMap(() => {
          return this.loadScript('https://unpkg.com/leaflet.mapkitmutant@latest/Leaflet.MapkitMutant.js');
        }));
    } else {
      return observableOf(true);
    }
  }

  private loadScript(scriptUrl: string): Observable<boolean> {
    return Observable.create(observer => {

      let script: any = document.createElement('script');

      if (script.readyState) {  // IE
        script.onreadystatechange = () => {
          if (script.readyState === 'loaded' || script.readyState === 'complete') {
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
