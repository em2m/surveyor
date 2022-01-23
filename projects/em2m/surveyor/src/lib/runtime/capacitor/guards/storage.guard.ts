import {Injectable} from '@angular/core';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanActivateChild} from '@angular/router';
import {ContextService} from '../../../core/extension/context.service';
import {Plugins} from '@capacitor/core';
const {Storage} = Plugins;

@Injectable({ providedIn: 'root' })
export class StorageGuard implements CanActivate, CanActivateChild {

  private loaded = false;

  constructor(private router: Router,
              private ctx: ContextService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (this.loaded) {
      return Promise.resolve(true);
    }

    return Storage.keys().then(keys => {
      const promises = keys.keys
        .filter(key => {
          return key && !this.ctx.getValue(key);
        })
        .map(key => {
          return Storage.get({key}).then(item => {
            this.ctx.setValue(key, JSON.parse(item.value), { broadcast: false, storage: 'NONE' });
          });
        });

      return Promise.all(promises)
        .then(() => {
          this.loaded = true;
          return true;
        });
    });
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>{
    return this.canActivate(route, state);
  }
}
