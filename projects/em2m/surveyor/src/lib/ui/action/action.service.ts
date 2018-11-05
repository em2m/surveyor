import {Injectable, Injector, Type} from '@angular/core';
import {Action} from './action.model';
import {ExtensionService} from '../../core/extension/extension.service';
import {Extension} from '../../core/extension/extension.model';

@Injectable()
export class ActionService {

  private ACTION_EXTENSION_TYPE = 'surveyor:action';

  constructor(private injector: Injector, private extensionService: ExtensionService) {
  }

  findActions(target: string): Array<Action> {
    const results = [];

    this.extensionService.getExtensionsForTypeAndTarget(this.ACTION_EXTENSION_TYPE, target)
      .forEach((extension: Extension) => {
        const type = extension.value as Type<Action>;
        const instance: Action = this.injector.get(type);
        results.push(instance);
      });
    return results;
  }
}
