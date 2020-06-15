import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Routes} from '@angular/router';
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

  constructor(private route: ActivatedRoute, private tabsService: TabsService, private ctx: ContextService) {
  }

  ngOnInit() {
    this.ctxSub = this.ctx.onContextChange()
      .subscribe(() => {
        this.tabs = this.tabsService.findTabs(this.route, this.routes, this.queryParams);
      });
    this.tabs = this.tabsService.findTabs(this.route, this.routes, this.queryParams);
  }

  ngOnChanges() {
    this.tabs = this.tabsService.findTabs(this.route, this.routes, this.queryParams);
  }

  ngOnDestroy() {
    if (this.ctxSub) {
      this.ctxSub.unsubscribe();
    }
  }
}
