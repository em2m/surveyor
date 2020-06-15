import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IntentService} from './intent.service';
import {StateService} from '../../core/state/state.service';

@Injectable({ providedIn: 'root' })
export class IntentGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router,
              private stateService: StateService,
              private intentService: IntentService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const queryParams = route.queryParamMap;
    const actionId = route.params.actionId;

    /*
    return this.authService.identService.detectBrandInfo({ text: window.location.href })
      .map((result: DetectBrandInfoResult) => {
        this.stateService.set('brand:loaded', result.brand);
    */
    const data: any = {};
    queryParams.keys.forEach( (key) => {
      data[key] = queryParams.get(key);
    });
    const intent = {
      action: actionId,
      type: data.type,
      category: data.category,
      data
    };
    this.intentService.broadcastIntent(intent);
    return false;

      /*
      })
      .catch(() => {
        return Observable.of(true);
      });
      */
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.canActivate(route, state);
  }

}
