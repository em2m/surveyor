import {Injectable} from '@angular/core';
import {Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {ContextService} from '../../../core/extension/context.service';

@Injectable({ providedIn: 'root' })
export class WebStorageResolver implements Resolve<any> {

  constructor(private router: Router,
              private ctx: ContextService) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    // Load Local Storage variables into the context service
    for (const key of Object.keys(localStorage)) {
      const value = localStorage.getItem(key);
      this.ctx.setValue(key, JSON.parse(value), { broadcast: false, storage: 'NONE' });
    }

    // Load Local Storage variables into the context service
    for (const key of Object.keys(sessionStorage)) {
      const value = sessionStorage.getItem(key);
      this.ctx.setValue(key, JSON.parse(value), { broadcast: false, storage: 'NONE' });
    }
  }
}
