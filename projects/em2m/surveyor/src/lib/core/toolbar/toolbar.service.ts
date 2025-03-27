import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AppConfig} from '../config/config.service';

@Injectable()
export class ToolbarService {

  private hideSideNav = !!this.config.get().hideSideNav || false;
  private hideToolbar = !!this.config.get().hideToolbar || false;
  private sideNavSubject = new BehaviorSubject(this.hideSideNav);
  private toolbarSubject = new BehaviorSubject(this.hideToolbar);
  public onSideNavChange = this.sideNavSubject.asObservable();
  public onToolbarChange = this.toolbarSubject.asObservable();

  constructor(private config: AppConfig) {}

  toggleToolbar() {
    this.hideToolbar = !this.hideToolbar;
    this.toolbarSubject.next(this.hideToolbar);
  }

  setToolbarVisible(visible: boolean = true) {
    this.hideToolbar = !visible;
    this.toolbarSubject.next(this.hideToolbar);
  }

  toggleSideNav() {
    this.hideSideNav  = !this.hideSideNav;
    this.sideNavSubject.next(this.hideSideNav);
  }

  setSideNavVisible(visible: boolean = true) {
    this.hideSideNav = !visible;
    this.sideNavSubject.next(this.hideSideNav);
  }
}
