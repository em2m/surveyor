
import {concatMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

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
      return of(true);
    }
  }

  private loadScript(scriptUrl: string): Observable<boolean> {
    return new Observable(observer => {
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
        script.onload = () => {
          observer.next(true);
          observer.complete();
        };
      }

      script.src = scriptUrl;
      script.type = 'text/javascript';
      script.async = false;
      script.charset = 'utf-8';

      document.getElementsByTagName('head')[0].appendChild(script);
    });
  }
}
