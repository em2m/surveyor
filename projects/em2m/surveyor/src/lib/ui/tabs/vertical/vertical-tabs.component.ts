import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, Routes} from '@angular/router';
import {TabsService} from '../tabs.service';
import {ContextService} from '../../../core/extension/context.service';
import {Subscription} from 'rxjs/internal/Subscription';

@Component({
  selector: 'vertical-tabs',
  templateUrl: './vertical-tabs.component.html',
  styleUrls: ['./vertical-tabs.component.scss']
})
export class VerticalTabsComponent implements OnInit, OnChanges, OnDestroy {

  @Input() routes?: Routes;
  @Input() queryParams ?: {};
  @Input() tabsGridWidth ?= 2;
  @Input() contentGridWidth ?= 10;

  public tabs: any[] = [];
  private ctxSub: Subscription;
  private eventSub: Subscription;
  private activeTab: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private tabsService: TabsService,
              private ctx: ContextService) {
  }

  ngOnInit() {
    this.ctxSub = this.ctx.onContextChange()
      .subscribe(() => {
        this.tabs = this.tabsService.findTabs(this.route, this.routes, this.queryParams);
      });
    this.tabs = this.tabsService.findTabs(this.route, this.routes, this.queryParams);

    this.eventSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.navigateToTab();
      }
    });
  }

  private navigateToTab() {
    const defaultTab = this.getDefaultTab();
    const currentTabId = this.getCurrentTabId();
    const hasTab = this.hasTab(currentTabId);
    if (!hasTab && !defaultTab.path.endsWith(currentTabId)) {
      this.activeTab = defaultTab.path;
      this.router.navigate([defaultTab.path], {relativeTo: this.route, skipLocationChange: true});
    } else {
      this.activeTab = currentTabId;
    }
  }

  private getCurrentTabId(): string {
    const paths = this.route.snapshot.children
      .filter(c => c.outlet === 'primary' && c.url.length > 0)
      .map(c => c.url[0].path);
    return paths.length > 0 ? paths[0] : null;
  }

  private hasTab(tabId: string): boolean {
    return !!(this.tabs?.find(t => t.path.endsWith(tabId)));
  }

  private getDefaultTab() {
    if (this.tabs.length > 0) {
      return this.tabs[0];
    } else {
      return {
        title: '',
        path: `./`,
        exact: false,
        queryParam: [],
        icon: null,
        id: null
      };
    }
  }

  ngOnChanges() {
    this.tabs = this.tabsService.findTabs(this.route, this.routes, this.queryParams);
  }

  ngOnDestroy() {
    if (this.ctxSub) {
      this.ctxSub.unsubscribe();
    }
    if (this.eventSub) {
      this.eventSub.unsubscribe();
    }
  }
}
