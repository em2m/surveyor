import {Observable, Subscription} from 'rxjs';

export interface Selection {
  empty: boolean;
}

export class ItemSelection implements Selection {

  public empty: boolean;
  public all: boolean;
  public allOnPage: boolean;
  public totalItems = 0;

  constructor(public items: Array<any>) {
    this.empty = !items || items.length === 0;
  }

  count(): number {
    if (this.all) {
      return this.totalItems;
    } else {
      return this.items ? this.items.length : 0;
    }
  }
}

export interface Action {
  enabled: boolean;
  text: string;
  toolTipText: string;
  primary: boolean;
  onSelectionChange(selection: Selection);
  run();
}

export class ActionSupport implements Action {
  enabled = true;
  text: string;
  iconClass: string;
  styleClass: string;
  toolTipText: string;
  primary = false;
  onSelectionChange(selection: Selection) {}
  run() {}
}

export abstract class ListSelectionAction extends ActionSupport implements Action {

  selection: ItemSelection;

  constructor(public minSelectionCount = 1,
              public maxSelectionCount = 1) {
    super();
  }

  onSelectionChange(selection: Selection) {
    if (selection) {
      this.selection = <ItemSelection>selection;
      let selectionCount = (selection as ItemSelection).items.length;
      this.enabled = selectionCount >= this.minSelectionCount && selectionCount <= this.maxSelectionCount;
    }
  }
}
