import {Component, ComponentFactoryResolver, ElementRef, OnDestroy, OnInit, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {ApplicationHeaderService} from './header.service';
import {Extension} from '../../../../core/extension/extension.model';
import {MenuContribution} from '../../../../ui/menu/menu.contribution';
import {StateService} from '../../../../core/state/state.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'surveyor-application-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class ApplicationHeaderComponent implements OnInit, OnDestroy {

  @ViewChild('navbar', {static: true}) navbar: ElementRef;
  @ViewChild('headerLeft', {read: ViewContainerRef, static: true}) headerLeft: any;
  @ViewChild('headerRight', {read: ViewContainerRef, static: true}) headerRight: any;
  brandColor: string;
  brandSub: Subscription;
  contributionRefs: Array<any> = [];

  constructor(private stateService: StateService,
              private headerService: ApplicationHeaderService,
              private resolver: ComponentFactoryResolver) {}

  ngOnInit() {
    this.brandSub = this.stateService.watch('brand:loaded').subscribe(brand => {
      if (brand && brand.settings) {
        this.brandColor = brand.settings.navColor;
      }
    });

    this.generateHeaders();
  }

  generateHeaders() {
    this.contributionRefs.forEach((contribution: any) => {
      contribution.destroy();
    });

    this.headerService.registerContributions();
    this.headerService.extensions.forEach((extension: Extension) => {

      let headerView = this.headerRight; // Default to right section
      if (extension.target === 'left') {
        headerView = this.headerLeft;
      }
      if (extension.target === 'right') {
        headerView = this.headerRight;
      }

      // Dynamically render custom picker component
      const factory = this.resolver.resolveComponentFactory(extension.value as Type<MenuContribution>);
      const contributionRef = headerView.createComponent(factory);
      contributionRef.instance.config = extension.config;
      this.contributionRefs.push(contributionRef);
    });
  }

  ngOnDestroy() {
    if (this.brandSub) {
      this.brandSub.unsubscribe();
    }
  }
}
