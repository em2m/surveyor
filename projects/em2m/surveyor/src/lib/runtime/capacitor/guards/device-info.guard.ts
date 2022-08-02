import {Injectable} from '@angular/core';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanActivateChild} from '@angular/router';
import {ContextService} from '../../../core/extension/context.service';
import {Device} from '@capacitor/device';

@Injectable({ providedIn: 'root' })
export class DeviceInfoGuard implements CanActivate, CanActivateChild {

  private loaded = false;

  constructor(private router: Router,
              private ctx: ContextService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (this.loaded) {
      return Promise.resolve(true);
    }

    return Device.getInfo().then(deviceInfo => {
      this.ctx.setValue('deviceInfo', deviceInfo, { broadcast: false, storage: 'NONE' });
      this.loaded = true;
      return true;
    });
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>{
    return this.canActivate(route, state);
  }
}
