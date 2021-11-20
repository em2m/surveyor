import {Injectable} from '@angular/core';
import {Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {DeviceInfo, Plugins} from '@capacitor/core';
import {ContextService} from '../../../core/extension/context.service';
const Device = Plugins.Device;

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
