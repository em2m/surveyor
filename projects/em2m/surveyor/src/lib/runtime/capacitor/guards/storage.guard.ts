import {Injectable} from '@angular/core';
import {
  Router,
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  CanActivateChild
} from '@angular/router';
import {Plugins} from '@capacitor/core';
import {ContextService} from '../../../core/extension/context.service';
const Storage = Plugins.Storage;

@Injectable({ providedIn: 'root' })
export class StorageGuard implements CanActivate, CanActivateChild {

  private loaded = false;

  constructor(private router: Router,
              private ctx: ContextService) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (this.loaded) {
      return Promise.resolve(true);
    }

    console.log('Started Storage Guard');

    const keys = await Storage.keys();
    const promises = keys.keys
      .filter(key => {
        return key && !this.ctx.getValue(key);
      })
      .map(key => {
        return Storage.get({key}).then(item => {
          this.ctx.setValue(key, JSON.parse(item.value), { broadcast: false, storage: 'NONE' });
        });
      });

    await Promise.all(promises);

    console.log('Finished Storage Guard');
    this.loaded = true;

    return Promise.resolve(true);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>{
    return this.canActivate(route, state);
  }
}
