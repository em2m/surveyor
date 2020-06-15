import {Component, OnInit} from '@angular/core';
import {ExtensionService} from '../../../../core/extension/extension.service';

@Component({
  templateUrl: './404.page.html'
})
export class Capacitor404Page implements OnInit {

  links: Array<any> = [];

  constructor(private extensionService: ExtensionService) {
  }

  ngOnInit() {
    this.links = this.extensionService.getExtensionsForTypeAndTarget('surveyor:link-contribution', '404')
      .map(extension => {
        if (extension) {
          return extension.value;
        }
      });
  }
}
