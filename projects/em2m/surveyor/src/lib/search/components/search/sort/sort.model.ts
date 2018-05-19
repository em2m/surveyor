import {Subject} from 'rxjs';
import {Sort} from '../../../shared/query.model';

export interface SortModel {
  whenSelected: Subject<any>;
  label: string;
  items: Array<SortItem>;
  selectedIndex?: number;
  setSelected(index: number): void;
}

export interface SortItem {
  sorts: Array<Sort>;
  label: string;
}

export class DefaultSortModel implements SortModel {
  label = '';
  items = [];
  selectedIndex = 1;
  whenSelected = new Subject<any>();

  constructor (items: Array<SortItem>, label, defaultIndex) {
    this.items = items;
    this.label = label;
    this.selectedIndex = defaultIndex;
  }

  setSelected(index: number): void {
    this.selectedIndex = index;
    this.whenSelected.next(this.items[index]);
  }
}
