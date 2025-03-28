import {Component, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Subscription} from 'rxjs';
import {StateService} from '../../../../core/state/state.service';
import {AppConfig} from '../../../../core/config/config.service';
import {MatSidenav} from '@angular/material/sidenav';
import {ContextService} from '../../../../core/extension/context.service';
import {ToolbarService} from '../../../../core/toolbar/toolbar.service';

@Component({
  selector: 'surveyor-application-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class ApplicationWrapperComponent implements OnInit, OnDestroy {

  @ViewChild(MatSidenav, {static: true}) matSidenav: MatSidenav;

  isMobile = true;
  brandColor: string;
  staticMenu = false;
  staticMenuOpened = false;
  opened = false;
  fixedMenu = false;
  hideToolbar = false;
  hideSideNav = false;
  banner: SurveyorBanner = null;
  bannerDismissed = false;
  private staticMenuSub: Subscription;
  private breakpointSub: Subscription;
  private brandSub: Subscription;
  private hideToolbarSub: Subscription;
  private hideSideNavSub: Subscription;
  private bannerSub: Subscription;

  constructor(private config: AppConfig,
              private stateService: StateService,
              private ctx: ContextService,
              private breakpointObserver: BreakpointObserver,
              private zone: NgZone,
              private toolbarService: ToolbarService) {}

  ngOnInit() {
    this.zone.run(() => {
      const isSmallScreen = this.breakpointObserver.isMatched([Breakpoints.Handset, Breakpoints.Tablet]);
      this.staticMenu = (isSmallScreen) ? false : !!this.config.get().staticMenu;
      // this.fixedMenu = (isSmallScreen) ? false : !!this.config.get().fixedMenu;
      this.fixedMenu = !!this.config.get().fixedMenu;
      this.hideToolbar = !!this.config.get().hideToolbar || false;
      this.hideSideNav = !!this.config.get().hideSideNav || false;
      this.opened = this.fixedMenu;
      if (this.opened) {
        this.matSidenav.open();
      } else if (isSmallScreen) {
        this.matSidenav.close();
      }
    });
    this.staticMenuSub = this.ctx.onValueChange('staticMenu').subscribe(value => {
      const isSmallScreen = this.breakpointObserver.isMatched([Breakpoints.Handset, Breakpoints.Tablet]);
      if (value !== undefined && value !== null) {
        this.staticMenu = (isSmallScreen) ? false : value;
      }
    });
    this.breakpointSub = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).subscribe(result => {
      this.zone.run(() => {
        this.staticMenu = (result.matches) ? false : !!this.config.get().staticMenu;
        // this.fixedMenu = (result.matches) ? false : !!this.config.get().fixedMenu;
        this.opened = this.fixedMenu;
        if (this.opened) {
          this.matSidenav.open();
        } else if (result.matches) {
          this.matSidenav.close();
        }
      });
    });

    this.brandSub = this.stateService.watch('brand:loaded').subscribe(brand => {
      const isSmallScreen = this.breakpointObserver.isMatched([Breakpoints.Handset, Breakpoints.Tablet]);
      if (brand && brand.settings) {
        this.brandColor = brand.settings.navColor;
        if (brand.settings.staticMenu !== undefined && brand.settings.staticMenu !== null) {
          this.staticMenu = (isSmallScreen) ? false : !!brand.settings.staticMenu;
        }
        if (brand.settings.fixedMenu !== undefined && brand.settings.fixedMenu !== null) {
          // this.fixedMenu = (isSmallScreen) ? false : !!brand.settings.fixedMenu;
          this.fixedMenu = !!brand.settings.fixedMenu;
          this.opened = this.fixedMenu;

          if (this.opened) {
            this.matSidenav.open();
          } else if (isSmallScreen) {
            this.matSidenav.close();
          }
        }
      }
    });

    this.hideSideNavSub = this.toolbarService.onSideNavChange.subscribe(hideSideNav => {
      this.zone.run(() => {
        this.hideSideNav = hideSideNav;
      });
    });

    this.hideToolbarSub = this.toolbarService.onToolbarChange.subscribe(hideToolbar => {
      this.zone.run(() => {
        this.hideToolbar = hideToolbar;
      });
    });

    this.banner = this.ctx.getValue('surveyorBanner');
    this.bannerSub = this.ctx.onValueChange('surveyorBanner').subscribe(banner => {
      this.banner = banner;
    });
  }

  ngOnDestroy() {
    this.breakpointSub?.unsubscribe();
    this.staticMenuSub?.unsubscribe();
    this.hideToolbarSub?.unsubscribe();
    this.hideSideNavSub?.unsubscribe();
    this.bannerSub.unsubscribe();
  }

  toggleMenu() {
    if (!this.staticMenu) {
      if (!this.fixedMenu) {
        this.matSidenav.toggle();
      }
    } else {
      this.staticMenuOpened = !this.staticMenuOpened;
    }
  }

  closeSidenav() {
    if (!this.staticMenu && !this.fixedMenu) {
      this.matSidenav.close();
    }
  }

  dismissBanner() {
    this.bannerDismissed = true;
    this.ctx.setValue('bannerDismissed', true);
  }
}

export interface SurveyorBanner {
  message: string;
  title?: string;
  iconClass?: string;
  backgroundColor?: string;
  color?: string;
  enabled?: boolean;
  dismissable?: boolean;
}
