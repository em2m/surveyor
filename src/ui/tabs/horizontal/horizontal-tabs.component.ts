import {Component, Input, OnChanges, OnInit} from "@angular/core";
import {ActivatedRoute, Routes} from "@angular/router";
import {TabsService} from "../tabs.service";

@Component({
  selector: 'horizontal-tabs',
  templateUrl: './horizontal-tabs.component.html',
  styleUrls: ['./horizontal-tabs.component.scss']
})
export class HorizontalTabsComponent implements OnInit, OnChanges {

  @Input() routes?: Routes;
  @Input() queryParams?: {};
  @Input() shadow? = false;
  tabs: any[] = [];

  constructor(private route: ActivatedRoute, private tabsService: TabsService) {
  }

  ngOnInit() {
    this.tabs = this.tabsService.findTabs(this.route, this.routes, this.queryParams);
  }

  ngOnChanges() {
    this.tabs = this.tabsService.findTabs(this.route, this.routes, this.queryParams);
  }
}
