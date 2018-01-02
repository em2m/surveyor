import {
  Component, ComponentFactoryResolver, ElementRef, OnDestroy, OnInit, Type, ViewChild, ViewContainerRef
} from "@angular/core";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {ApplicationHeaderService} from "./header.service";
import {Extension} from "../../../core/extension/extension.model";
import {MenuContribution} from "../../../ui/menu/menu.contribution";
import {StateService} from "../../../core/state/state.service";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";

@Component({
  selector: 'surveyor-application-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class ApplicationHeaderComponent implements OnInit, OnDestroy {

  @ViewChild('navbar') navbar: ElementRef;
  @ViewChild('headerLeft', {read: ViewContainerRef}) headerLeft: any;
  @ViewChild('headerRight', {read: ViewContainerRef}) headerRight: any;
  showDropDown = false;
  brandColor: string;
  brandSub: any;
  contributionRefs: Array<any> = [];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private stateService: StateService,
              private headerService: ApplicationHeaderService,
              private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.brandSub = this.stateService.watch("brand:loaded").subscribe(brand => {
      if (brand && brand.settings) {
        this.brandColor = brand.settings.navColor;
      }
    });

    this.generateHeaders();
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        this.generateHeaders();

        while (route.firstChild) {
          route = route.firstChild;
        }
        if (route.data['value']['showOrgDropdown']) {
          return route;
        } else {
          return route.parent;
        }
      })
      .flatMap(route => route.data)
      .subscribe(data => {
        this.showDropDown = data['showOrgDropdown'];
      });
  }

  generateHeaders() {
    this.contributionRefs.forEach((contribution: any) => {
      contribution.destroy();
    });

    this.headerService.registerContributions();
    this.headerService.extensions.forEach((extension: Extension) => {

      let headerView = this.headerRight; // Default to right section
      if (extension.target === "left") {
        headerView = this.headerLeft;
      }
      if (extension.target === "right") {
        headerView = this.headerRight;
      }

      // Dynamically render custom picker component
      let factory = this.resolver.resolveComponentFactory(extension.value as Type<MenuContribution>);
      let contributionRef = headerView.createComponent(factory);
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
