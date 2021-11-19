import {Injectable} from '@angular/core';
import {Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {App, AppInfo} from '@capacitor/app';
import {ContextService} from '../../../core/extension/context.service';

@Injectable({ providedIn: 'root' })
export class AppInfoResolver implements Resolve<any> {

  constructor(private router: Router,
              private ctx: ContextService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<AppInfo> {
    return App.getInfo().then(appInfo => {
      this.ctx.setValue('appInfo', appInfo, { broadcast: false, storage: 'NONE' });
      return appInfo;
    });
  }
}
