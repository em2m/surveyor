import {Component, Input, EventEmitter, Output, OnInit} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import {ItemSelection} from './action.model';

@Component({
  selector: 'surveyor-action-button-selection',
  templateUrl: './action-button-selection.component.html'
})
export class ActionButtonSelectionComponent implements OnInit {

  @Input() actionTarget: string;
  @Input() selection: Observable<ItemSelection>;
  @Output() clearSelection: EventEmitter<any> = new EventEmitter();
  @Output() selectAll: EventEmitter<any> = new EventEmitter();
  whenSelection = new BehaviorSubject<ItemSelection>(null);
  itemSelection: ItemSelection;

  ngOnInit() {
    if (this.selection) {
      this.selection.subscribe((itemSelection: ItemSelection) => {
        this.itemSelection = itemSelection;
        this.whenSelection.next(this.itemSelection);
      });
    }
  }

  handleSelectAll() {
    this.itemSelection.all = true;
    this.selectAll.next(true);
    this.whenSelection.next(this.itemSelection);
  }
}
