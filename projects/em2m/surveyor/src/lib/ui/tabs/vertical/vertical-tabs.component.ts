import {Component, Input, OnChanges, OnInit} from "@angular/core";
import {ActivatedRoute, Routes} from "@angular/router";
import {TabsService} from "../tabs.service";

@Component({
  selector: 'vertical-tabs',
  templateUrl: './vertical-tabs.component.html',
  styleUrls: ['./vertical-tabs.component.scss']
})
export class VerticalTabsComponent implements OnInit, OnChanges {

  @Input() routes?: Routes;
  @Input() queryParams?: {};
  @Input() tabsGridWidth? = 2;
  @Input() contentGridWidth? = 10;

  public tabs: any[] = [];

  constructor(private route: ActivatedRoute, private tabsService: TabsService) {
  }

  ngOnInit() {
    this.tabs = this.tabsService.findTabs(this.route, this.routes, this.queryParams);
  }

  ngOnChanges() {
    this.tabs = this.tabsService.findTabs(this.route, this.routes, this.queryParams);
  }
}
