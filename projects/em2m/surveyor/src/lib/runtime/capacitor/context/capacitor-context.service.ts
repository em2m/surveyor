import {ContextService} from '../../../core/extension/context.service';
import {Router} from '@angular/router';
import {AppConfig} from '../../../core/config/config.service';
import {Injectable} from '@angular/core';
import {ContextOptions} from '../../../core/extension/extension.model';
import {Plugins} from '@capacitor/core';
const {Storage} = Plugins;

@Injectable({ providedIn: 'root' })
export class CapacitorContextService extends ContextService {

  constructor(router: Router, config: AppConfig) {
    super(router, config);
  }

  setValue(key: string, value: any, options: ContextOptions) {
    super.setValue(key, value, options);

    if (options?.storage === 'LOCAL' || options?.storage === 'SESSION') {
      if (value === undefined || value ===  null) {
        Storage.remove({key});
      } else {
        Storage.set({key, value: JSON.stringify(value)});
      }
    }
  }

  clearValues() {
    const  keys = Object.keys(this.getContext().values || {});

    super.clearValues();

    for (const key in keys) {
      if (keys[key]) {
        Storage.remove({key});
      }
    }
  }
}
