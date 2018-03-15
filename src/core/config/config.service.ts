import {Inject, Injectable, Injector, Optional} from "@angular/core";
//import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import {Http} from "@angular/http";

@Injectable()
export class AppConfig {

  static readonly DEFAULT_CONFIG_URI = "config/app.config.json";

  //private http: HttpClient;
  private configUri = AppConfig.DEFAULT_CONFIG_URI;
  private config: any;

  constructor(private http: Http, @Inject("SURVEYOR_CONFIG_URI") @Optional() configUri: string) {
    //this.http = injector.get(HttpClient);
    if (configUri) {
      this.configUri = configUri;
    }
  }

  get() {
    return this.config;
  }

  load() {
    // Load the config using a promise since the application initialization waits for the promise to resolve before continuing
    return new Promise((resolve, reject) => {
      this.http.get(this.configUri)
        .map(res => res.json())
        .catch((error: any): any => {
          console.error('App configuration failed to load:', this.configUri);
          resolve(true);
          return Observable.throw(error.json().error || 'App configuration failed to load');
        })
        .subscribe((config: any) => {
          this.config = config;
          resolve(true);
        });
    });
  }
}
