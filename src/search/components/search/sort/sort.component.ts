import {Component, Input, OnChanges, OnInit} from "@angular/core";
import {SortItem, SortModel} from "./sort.model";

@Component({
  selector: 'surveyor-sort-view',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']

})
export class SortComponent implements OnInit, OnChanges {
  @Input() model: SortModel;

  items: Array<SortItem>;
  label: string;
  defaultIndex;
  selectedIndex: number;
  selectedItem: SortItem;

  ngOnInit() {
    this.selectedIndex = this.defaultIndex;
    this.selectedItem = this.model.items[this.defaultIndex];
  }

  ngOnChanges() {
    this.items = this.model.items;
    this.label = this.model.label;
    this.defaultIndex = this.model.selectedIndex;
    this.handleClick(this.defaultIndex);
  }

  public handleClick(index) {
    this.selectedIndex = index;
    this.selectedItem = this.items[index];
    this.model.setSelected(index);
  }
}
