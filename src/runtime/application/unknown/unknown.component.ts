import {Component, OnInit} from "@angular/core";
import {ExtensionService} from "../../../core/extension/extension.service";

@Component({
  selector: 'surveyor-application-unknown',
  templateUrl: './unknown.component.html'
})
export class ApplicationUnknownComponent implements OnInit {

  links: Array<any> = [];

  constructor(private extensionService: ExtensionService) {
  }

  ngOnInit() {
    this.links = this.extensionService.getExtensionsForTypeAndTarget('surveyor:link-contribution', "404")
      .map(extension => {
        if (extension) {
          let link = extension.value;
          //link.href = link.href ? link.href.replace("${orgId}", this.authService.getOrganizationId()) : "";
          return link;
        }
      });
  }
}
