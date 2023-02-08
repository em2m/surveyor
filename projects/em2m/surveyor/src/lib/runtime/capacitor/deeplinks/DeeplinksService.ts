import {Router} from '@angular/router';
import {AppConfig} from '../../../core/config/config.service';
import {Injectable} from '@angular/core';
import {URLOpenListenerEvent, App} from "@capacitor/app";
import {NgZone} from "@angular/core";

@Injectable({ providedIn: 'root' })
export class DeeplinksService {

  constructor(private config: AppConfig, private router: Router, private zone: NgZone) {
    this.initalizeApp();
  }

  initalizeApp() {
    const isMobile = this.config.get().mobile?.isMobile || false;
    if (isMobile) {
      App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
        this.zone.run(() => {
          const domain = this.config.get().mobile?.deepLinkHost;
          const pathArray = event.url.split(domain)
          const appPath = pathArray.pop()
          if (appPath && domain) {
            this.router.navigateByUrl('/' + appPath)
          }
        })
      })
    }
  }
}
