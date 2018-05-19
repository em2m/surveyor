import {Component, ViewChild, ElementRef, Input, EventEmitter, Output} from "@angular/core";

@Component({
  selector: 'mdl-selectable-item',
  templateUrl: './selectable-item.component.html',
  styleUrls: ['./selectable-item.component.scss']
})
export class MdlSelectableItemComponent {

  @Input() item: any;
  @Input() highlightedItem: string;
  @Output() onSelect = new EventEmitter<any>();
  @ViewChild("selectableItem") el: ElementRef;

  displayItem() {
    return this.item.label || this.item;
  }

  isHighlighted() {
    return (this.item.value || this.item) === this.highlightedItem;
  }

  emitSelection() {
   this.onSelect.emit(this.item);
  }
}
