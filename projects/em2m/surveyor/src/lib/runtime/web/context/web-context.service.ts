import {ContextService} from '../../../core/extension/context.service';
import {Router} from '@angular/router';
import {AppConfig} from '../../../core/config/config.service';
import {Injectable} from '@angular/core';
import {ContextOptions} from '../../../core/extension/extension.model';

@Injectable({ providedIn: 'root' })
export class WebContextService extends ContextService {

  constructor(router: Router, config: AppConfig) {
    super(router, config);
  }

  setValue(key: string, value: any, options: ContextOptions) {
    super.setValue(key, value, options);

    if (options?.storage === 'LOCAL') {
      if (value === undefined || value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } else if (options?.storage === 'SESSION') {
      if (value === undefined || value === null) {
        sessionStorage.removeItem(key);
      } else {
        sessionStorage.setItem(key, JSON.stringify(value));
      }
    }
  }

  clearValues() {
    const  keys = Object.keys(this.getContext().values || {});

    super.clearValues();

    for (const key in keys) {
      if (keys[key]) {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
      }
    }
  }
}
