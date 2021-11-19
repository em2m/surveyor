import {Injectable} from '@angular/core';
import {Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Storage} from '@capacitor/storage';
import {ContextService} from '../../../core/extension/context.service';

@Injectable({ providedIn: 'root' })
export class StorageResolver implements Resolve<any> {

  constructor(private router: Router,
              private ctx: ContextService) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    const keys = await Storage.keys();
    for (const key of keys.keys) {
      try {
        if (key) {
          const item = await Storage.get({key});
          this.ctx.setValue(key, JSON.parse(item.value), { broadcast: false, storage: 'NONE' });
        }
      } catch (ex) {

      }
    }
  }
}
