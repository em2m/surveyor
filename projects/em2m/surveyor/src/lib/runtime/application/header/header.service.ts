import {Injectable} from '@angular/core';
import {Extension} from '../../../core/extension/extension.model';
import {ExtensionService} from '../../../core/extension/extension.service';

@Injectable()
export class ApplicationHeaderService {

  public extensions: Array<Extension> = [];
  public EXTENSION_TYPE = 'surveyor:header-menu-contribution';

  constructor(private extensionService: ExtensionService) {
    this.registerContributions();
  }

  registerContributions() {
    this.extensions = [];

    this.extensionService.getExtensionsForType(this.EXTENSION_TYPE)
      .forEach((extension: Extension) => {
        this.extensions.push(extension);
      });
  }
}
