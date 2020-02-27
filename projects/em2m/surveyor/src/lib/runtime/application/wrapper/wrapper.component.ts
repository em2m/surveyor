import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Subscription} from 'rxjs';
import {StateService} from '../../../core/state/state.service';
import {ContextService} from '../../../core/extension/context.service';

@Component({
  selector: 'surveyor-application-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class ApplicationWrapperComponent implements OnInit, OnDestroy {

  isMobile = true;
  brandColor: string;
  hideHeader = false;
  private blackListedRoles: Array<string> = ['recoveryAgentAnonymous', 'dealerAccessAnonymous'];
  private breakpointSub: Subscription;
  private brandSub: Subscription;

  constructor(private breakpointObserver: BreakpointObserver,
              private ctx: ContextService,
              private stateService: StateService) {}

  ngOnInit() {
    this.breakpointSub = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).subscribe(result => {
      // this.isMobile = result.matches;
    });

    this.brandSub = this.stateService.watch('brand:loaded').subscribe(brand => {
      if (brand && brand.settings) {
        this.brandColor = brand.settings.navColor;
      }
    });

    this.hideHeader = this.accountRoleBlackListed();
  }

  private accountRoleBlackListed(): boolean {
    let result = false;
    const accountRoles = this.ctx.getValue('roles');
    this.blackListedRoles.forEach(role => {
      if (accountRoles.includes(role)) {
        result = true;
      }
    });

    return result;
  }

  ngOnDestroy() {
    if (this.breakpointSub) {
      this.breakpointSub.unsubscribe();
    }
  }
}
