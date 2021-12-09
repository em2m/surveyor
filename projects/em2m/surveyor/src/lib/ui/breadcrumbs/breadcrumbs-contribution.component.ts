import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {BreadcrumbItem} from './breadcrumbs.model';
import {Subscription} from 'rxjs';
import {BreakpointObserver} from '@angular/cdk/layout';
import {ContextService} from '../../core/extension/context.service';
import {MatMenuTrigger} from '@angular/material/menu';
import {BreadcrumbService} from './breadcrumb.service';


@Component({
  templateUrl: './breadcrumbs-contribution.component.html',
  styleUrls: ['./breadcrumbs-contribution.component.scss'],
})
export class BreadcrumbsContribution implements OnInit, OnDestroy {

  items: Array<BreadcrumbItem> = [];
  tabletScreen: boolean;
  windowSizeTrackerSub: Subscription;
  @ViewChild(MatMenuTrigger, {static: true}) trigger: MatMenuTrigger;
  private routerSub: Subscription;
  private breadcrumbsSub: Subscription;

  constructor(private router: Router,
              private breakpoint: BreakpointObserver,
              private ctx: ContextService,
              private breadcrumbService: BreadcrumbService) {
  }

  ngOnInit() {
    // this.tabletScreen is checked to display the full or collapsed breadcrumbs.
    this.tabletScreen = this.breakpoint.isMatched('(max-width: 839px)');
    this.breadcrumbsSub = this.breadcrumbService.onRefresh().subscribe(refresh => {
      this.items = this.buildItems();
    });

    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.items = this.buildItems();
      }
    });

    this.items = this.buildItems();   // First event is always missed since subscribe occurs after initial NavigationEnd

    // The function below collapses the breadcrumbs navigation if the window is re-sized.
    this.windowSizeTrackerSub = this.breakpoint.observe([
      '(max-width: 840px)'
    ])
      .subscribe(result => {
        this.tabletScreen = result.matches;
        this.items = this.buildItems();
      });
  }

  ngOnDestroy() {
    if (this.windowSizeTrackerSub) {
      this.windowSizeTrackerSub.unsubscribe();
    }
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
    if (this.breadcrumbsSub){
      this.breadcrumbsSub.unsubscribe();
    }
  }

  openMenu() {
    // this.trigger.openMenu();
  }

  private parseRouteState(route: ActivatedRoute): Array<ActivatedRoute> {
    let currentRoute = route;
    while (currentRoute.children.length > 0) {
      currentRoute = currentRoute.children[0];
    }
    return currentRoute.pathFromRoot;
  }

  private buildItems(): Array<BreadcrumbItem> {
    const routes = this.parseRouteState(this.router.routerState.root);
    let url = '';
    let hideBreadcrumbsRecursive;
    let navigationArray = [];
    let stopIndex = 0;
    return Array.prototype.concat(
      ...routes.map((route: ActivatedRoute) => {
        const title = route?.routeConfig?.data?.title;
        url = url + '/' + route.snapshot.url.map(segment => segment.path).join('/');
        stopIndex = stopIndex + 1;

        // There are two conditionals here because we don't want a child` breadcrumb to overwrite hideBreadcrumbsRecursive. This way, we only need to
        // set the hideBreadcrumb data to be true in the first breadcrumb we want to stop at. All of its children will also be hidden.
        if (title && !hideBreadcrumbsRecursive) {
          hideBreadcrumbsRecursive = route?.routeConfig?.data?.hideBreadcrumb;
        }
        if (title && !hideBreadcrumbsRecursive && this.tabletScreen) {
          if (typeof title === 'string' || typeof title === 'number') {
            navigationArray.push({label: title, href: url});
          } else if (typeof title === 'function') {
            let evaluatedTitles = title(this.ctx.getContext());
            if (typeof evaluatedTitles === 'string' || typeof evaluatedTitles === 'number') {
              // For single title breadcrumbs (i.e. devices or vehicles) we want to add them straight into the drop down nav.
              navigationArray.push({label: evaluatedTitles, href: url});
            } else {
              evaluatedTitles = [evaluatedTitles];
              return evaluatedTitles.filter(evaluatedTitle => !!evaluatedTitle).map((evaluatedTitle) => {
                if (!evaluatedTitle.href) {
                  evaluatedTitle.href = url;
                }
                return evaluatedTitle;
              });
            }
          }
        } else if (title && !hideBreadcrumbsRecursive && !this.tabletScreen) {
          navigationArray = [];
          if (typeof title === 'string' || typeof title === 'number') {
            return [{label: title, href: url}];
          } else if (typeof title === 'function') {
            let evaluatedTitles = title(this.ctx.getContext());
            if (!Array.isArray(evaluatedTitles)) {
              evaluatedTitles = [evaluatedTitles];
            }
            return evaluatedTitles.filter(evaluatedTitle => !!evaluatedTitle).map((evaluatedTitle) => {
              if (typeof evaluatedTitle === 'string' || typeof evaluatedTitle === 'number') {
                return {label: evaluatedTitle, href: url};
              } else {
                if (!evaluatedTitle.href) {
                  evaluatedTitle.href = url;
                }
                return evaluatedTitle;
              }
            });
          }
        }
        if (stopIndex === routes.length) {
          const lastItemIndex = navigationArray.length - 1;
          const outerLabel = navigationArray[lastItemIndex];
          if (navigationArray.length === 1) {
            // If there's only one breadcrumb in the list we don't want a drop down nav.
            return {label: outerLabel.label, href: outerLabel.href};
          } else if (navigationArray.length > 1) {
            // If there is more than one breadcrumb in the list we want a drop down nav.
            return {label: outerLabel.label, href: outerLabel.href, items: navigationArray};
          }
        }
        // Several of the routes are not named and should not be breadcrumbs. Returning an empty array ignores them.
        return [];
      }));
  }
}
