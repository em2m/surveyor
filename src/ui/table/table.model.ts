import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {ItemSelection} from "../action/action.model";

export interface Column {
  key: any;
  name: string;
  title: string;
  format?: any;
  style?: any;
  headerStyle?: any;
}

export interface TableModel {
  rows: Observable<Array<any>>;
  cols: Array<Column>;
  selection: Observable<ItemSelection>;
  whenClicked: Observable<any>;
  whenClear: Observable<any>;
  cellValue(row: any, col: Column): string;
  isSelected(row: any): boolean;
  setSelected(row: any, value: boolean): void;
  clearSelection(): void;
  rowClicked(row: any): void;
}

export class DefaultTableModel implements TableModel {

  selection: BehaviorSubject<ItemSelection> = new BehaviorSubject<ItemSelection>(new ItemSelection([]));
  whenClicked = new Subject<any>();
  whenClear = new Subject<any>();

  constructor(public cols: Array<Column>, public rows: BehaviorSubject<Array<any>>) {
  }

  cellValue(row: any, col: Column) {
    let val = row[col.key];
    let format = (<any>col).format;
    return format ? format(val, row) : val;
  }

  isSelected(row: any): boolean {
    return row.selected;
  }

  rowClicked(row: any) {
    this.whenClicked.next(row);
  }

  setSelected(row: any, value: boolean) {

    row.selected = value;
    let selected = this.rows.getValue().filter((it: any) => {
      return it.selected;
    });
    let itemSelection = new ItemSelection(selected);
    itemSelection.allOnPage = selected.length === this.rows.getValue().length;

    this.selection.next(itemSelection);
  }

  clearSelection() {
    /*
    this.rows.getValue().forEach((row: any) => {
      row.selected = false
    });
    let selected = this.rows.getValue().filter((it: any) => {
      return it.selected;
    });
    this.selection.next(new ItemSelection(selected));
    */
    this.whenClear.next();
  }

}
