import {Component, Input, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {TableModel, Column} from "./table.model";
import {Selection, ItemSelection} from "../action/action.model";

@Component({
  selector: 'surveyor-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {

  @Input() model: TableModel;
  @Input() selectionDisabled = false;

  public rows: Array<any>;
  public cols: Array<Column> = [];
  public selection: ItemSelection;
  public showSelections = false;
  public whenSelections: Observable<Selection>;
  public toggle = false;

  constructor() {
  }

  ngOnInit() {
    this.cols = this.model.cols;
    this.whenSelections = this.model.selection;
    this.model.rows.subscribe((rows) => {
      this.rows = rows.map((row) => {
        let result: any = {};
        result.orig = row;
        result.selected = row.selected;
        result.values = {};
        this.cols.forEach((col) => {
          result.values[col.key] = this.model.cellValue(row, col);
        });
        return result;
      });
    });

    this.model.selection.subscribe((selection) => {
      this.selection = selection;
      this.showSelections = selection.empty;
    });

    this.model.whenClear.subscribe(() => {
      this.clearSelection();
    });
  }

  public handleClick(row) {
    this.model.rowClicked(row.orig);
  }

  public clearSelection() {
    this.setToggle(false);
  }

  public selectionChange(row: any, selected: boolean) {
    this.model.setSelected(row.orig, selected);
  }

  public toggleAll() {
    let hasSelectedRows = false;
    this.rows.forEach((row: any) => {
      hasSelectedRows = row.selected;
      if (hasSelectedRows) {
        return;
      }
    });
    this.setToggle(!hasSelectedRows);
  }

  setToggle(toggle: boolean) {
    this.rows.forEach((row: any) => {
      row.selected = toggle;
      this.model.setSelected(row.orig, row.selected);
    });
    this.toggle = toggle;
  }

}
