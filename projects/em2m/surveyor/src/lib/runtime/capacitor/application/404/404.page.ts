import {Component, OnInit} from '@angular/core';
import {ExtensionService} from '../../../../core/extension/extension.service';
import {AppConfig} from "../../../../core/config/config.service";

@Component({
  templateUrl: './404.page.html'
})
export class Capacitor404Page implements OnInit {

  links: Array<any> = [];
  isMobile = !!this.config.get().mobile;

  constructor(private extensionService: ExtensionService,
              private config: AppConfig) {
  }

  ngOnInit() {
    console.log(this.isMobile)
    this.links = this.extensionService.getExtensionsForTypeAndTarget('surveyor:link-contribution', '404')
      .map(extension => {
        if (extension) {
          return extension.value;
        }
      });
  }

  refresh() {
    window.location.href = '/';
  }
}
