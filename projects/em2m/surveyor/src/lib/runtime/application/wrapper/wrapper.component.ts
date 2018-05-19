import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Subscription} from 'rxjs';
import {StateService} from '../../../core/state/state.service';

@Component({
  selector: 'surveyor-application-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class ApplicationWrapperComponent implements OnInit, OnDestroy {

  isMobile = true;
  brandColor: string;
  private breakpointSub: Subscription;
  private brandSub: Subscription;

  constructor(private stateService: StateService,
              private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.breakpointSub = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).subscribe(result => {
      // this.isMobile = result.matches;
    });

    this.brandSub = this.stateService.watch('brand:loaded').subscribe(brand => {
      if (brand && brand.settings) {
        this.brandColor = brand.settings.navColor;
      }
    });
  }

  ngOnDestroy() {
    if (this.breakpointSub) {
      this.breakpointSub.unsubscribe();
    }
  }
}
