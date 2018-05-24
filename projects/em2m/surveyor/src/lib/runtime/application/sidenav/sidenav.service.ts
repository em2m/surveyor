import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Extension} from '../../../core/extension/extension.model';
import {ExtensionService} from '../../../core/extension/extension.service';
import {ContextService} from '../../../core/extension/context.service';

@Injectable()
export class SidenavService {

  extensionsSubject: BehaviorSubject<Extension[]> = new BehaviorSubject([]);
  private visible = false;
  private extensions: Array<Extension> = [];
  private SIDENAV_EXTENSION_TYPE = 'surveyor:sidenav-menu-contribution';

  constructor(private extensionService: ExtensionService,
              private contextService: ContextService) {
    this.registerContributions();
  }

  registerContributions() {
    // Register all components defined as plugin extensions sorted in priority order
    this.extensionService.getExtensionsForType(this.SIDENAV_EXTENSION_TYPE)
      .forEach((extension: Extension) => {
        let items = extension.config.items;

        if (items && items.length > 0) {
          extension.config.items = items.filter(item => {
            let filters = item.filters || [];
            let allowed = true;

            filters.forEach(f => {
              allowed = allowed && f.filter(this.contextService.getContext());
            });
            return allowed;
          });
        }

        this.extensions.push(extension);
      });

      this.extensionsSubject.next(this.extensions);
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }
}
