import {Injectable} from '@angular/core';
import {Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Device, DeviceInfo} from '@capacitor/device';
import {ContextService} from '../../../core/extension/context.service';

@Injectable({ providedIn: 'root' })
export class DeviceInfoResolver implements Resolve<any> {

  constructor(private router: Router,
              private ctx: ContextService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<DeviceInfo> {
    return Device.getInfo().then(deviceInfo => {
      this.ctx.setValue('deviceInfo', deviceInfo, { broadcast: false, storage: 'NONE' });
      return deviceInfo;
    });
  }
}
