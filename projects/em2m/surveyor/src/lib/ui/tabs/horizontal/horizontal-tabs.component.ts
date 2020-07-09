import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Routes} from '@angular/router';
import {TabsService} from '../tabs.service';
import {ContextService} from '../../../core/extension/context.service';
import {Subscription} from 'rxjs/internal/Subscription';

@Component({
  selector: 'horizontal-tabs',
  templateUrl: './horizontal-tabs.component.html',
  styleUrls: ['./horizontal-tabs.component.scss']
})
export class HorizontalTabsComponent implements OnInit, OnChanges, OnDestroy {

  @Input() routes?: Routes;
  @Input() queryParams?: {};
  @Input() shadow ?= false;
  tabs: any[] = [];
  private ctxSub: Subscription;

  constructor(private route: ActivatedRoute, private tabsService: TabsService, private ctx: ContextService) {
  }

  ngOnInit() {
    this.ctxSub = this.ctx.onContextChange()
      .subscribe(() => {
        this.tabs = this.tabsService.findTabs(this.route, this.routes, this.queryParams);
      });
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
