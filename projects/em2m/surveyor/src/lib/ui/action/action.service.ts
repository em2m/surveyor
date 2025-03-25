import {Injectable, Injector, Type} from '@angular/core';
import {Action} from './action.model';
import {ExtensionService} from '../../core/extension/extension.service';
import {Extension} from '../../core/extension/extension.model';
import {Surveyori18nService} from "../i18n/shared/i18n.service";

@Injectable()
export class ActionService {

  private ACTION_EXTENSION_TYPE = 'surveyor:action';

  constructor(private injector: Injector,
              private extensionService: ExtensionService,
              private i18nService: Surveyori18nService) {
  }

  findActions(target: string): Array<Action> {
    const results = [];

    this.extensionService.getExtensionsForTypeAndTarget(this.ACTION_EXTENSION_TYPE, target)
      .forEach((extension: Extension) => {
        const type = extension.value as Type<Action>;
        let instance: Action = this.injector.get(type);
        instance.text = this.i18nService.translate(instance.text);
        instance.toolTipText = this.i18nService.translate(instance.toolTipText);
        results.push(instance);
      });

    return results;
  }

  findActionById(id: string): Action {
    let result: Action = null;
    let ext = this.extensionService.getExtensionById(this.ACTION_EXTENSION_TYPE, id);
    if (ext) {
      const type = ext.value as Type<Action>;
      let instance: Action = this.injector.get(type);
      instance.text = this.i18nService.translate(instance.text);
      instance.toolTipText = this.i18nService.translate(instance.toolTipText);
      result = instance;
    }
    return result;
  }
}
