import {Observable, Subject, BehaviorSubject} from 'rxjs';
import {ItemSelection} from '../action/action.model';

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
    const val = row[col.key];
    const format = (col as any).format;
    let result = val;
    if (format) {
      try {
        result = format(val, row);
      } catch (ex) {}
    }
    return result;
  }

  isSelected(row: any): boolean {
    return row.selected;
  }

  rowClicked(row: any) {
    this.whenClicked.next(row);
  }

  setSelected(row: any, value: boolean) {

    row.selected = value;
    const selected = this.rows.getValue().filter((it: any) => {
      return it.selected;
    });
    const itemSelection = new ItemSelection(selected);
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
