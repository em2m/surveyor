import {Inject, Injectable, Optional} from '@angular/core';
import { map } from 'rxjs/operators';
import {Http} from '@angular/http';

@Injectable()
export class AppConfig {

  static readonly DEFAULT_CONFIG_URI = 'config/app.config.json';

  private configUri = AppConfig.DEFAULT_CONFIG_URI;
  private config: any;

  constructor(private http: Http, @Inject('SURVEYOR_CONFIG_URI') @Optional() configUri: string) {
    if (configUri) {
      this.configUri = configUri;
    }
  }

  get() {
    return this.config;
  }

  load(): Promise<any> {
    return this.http.get(this.configUri).pipe(
      map(res => {
        this.config = res.json();
        return this.config;
      }),
    ).toPromise();
  }
}
