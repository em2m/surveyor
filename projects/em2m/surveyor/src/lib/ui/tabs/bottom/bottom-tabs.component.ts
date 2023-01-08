import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute, Routes} from '@angular/router';
import {TabsService} from '../tabs.service';

@Component({
  selector: 'surveyor-bottom-tabs',
  templateUrl: './bottom-tabs.component.html',
  styleUrls: ['./bottom-tabs.component.scss']
})
export class BottomTabsComponent implements OnInit, OnChanges {

  @Input() routes?: Routes;
  @Input() queryParams?: any = {};
  @Input() suppressTitles?: boolean;
  @Input() badges?: any = {};

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
