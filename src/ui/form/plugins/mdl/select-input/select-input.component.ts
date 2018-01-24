import {
  Component, ViewChild, ViewChildren, ElementRef, QueryList, OnInit,
  AfterViewInit
} from "@angular/core";
import {MdlSelectableItemComponent} from "./selectable-item.component";
import {SurveyorFormInputComponent} from "../../../form-input-component";

@Component({
  selector: 'surveyor-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss']
})
export class MdlSelectInputComponent extends SurveyorFormInputComponent implements OnInit, AfterViewInit {

  @ViewChild("inputBox") inputBox: ElementRef;
  @ViewChild("myPopover") popover: ElementRef;
  @ViewChildren(MdlSelectableItemComponent) itemList: QueryList<MdlSelectableItemComponent>;
  items: any[];
  dropdownIsVisible = false;
  highlightedItem: string = null;
  value: string;

  ngOnInit() {
  }

  ngAfterViewInit() {
    // Hack required to get MDL to bind event handlers after a view change
    window.dispatchEvent(new Event("load"));
    this.initialize();
  }

  setOptions(opts: any) {
    this.controlDefinition.options = opts;
    this.initialize();
  }

  initialize() {
    this.items = JSON.parse(JSON.stringify(this.controlDefinition.options.selections || []));
    let included = this.items.map(item => {
      if (item === undefined) return item;
      else return item.value;
    }).indexOf(this.controlDefinition.value) > -1;
    if (included) {
      this.setValue(this.controlDefinition.value);
    } else {
      this.setValue(null);
    }
  }

  showDropdown() {
    this.setShowErrors(false);
    this.dropdownIsVisible = true;
  }

  hideDropdown() {
    this.setShowErrors(true);
    this.dropdownIsVisible = false;
  }

  navigateDropdown($event) {
    if (!this.dropdownIsVisible) {
      this.showDropdown();
    }

    let move = (startIndex: number, shift: number) => {
      let nextIndex = startIndex + shift >= 0 ? (startIndex + shift)
        % (this.filteredItems().length) : this.filteredItems().length - 1;
      this.highlightedItem = this.filteredItems()[nextIndex].value || this.filteredItems()[nextIndex];
      return nextIndex;
    };

    let scrollDown = () => {
      let selectedEl = this.itemList.find((itemEl: MdlSelectableItemComponent) => {
        return (itemEl.item.value || itemEl.item) === this.highlightedItem;
      });
      let offset = selectedEl.el.nativeElement.offsetTop;
      let popoverHeight = this.popover.nativeElement.offsetHeight;
      let elementHeight = selectedEl.el.nativeElement.offsetHeight;

      if (offset > this.popover.nativeElement.scrollTop) {
        this.popover.nativeElement.scrollTop = offset - (popoverHeight - elementHeight);
      }
    };

    let scrollUp = () => {
      let selectedEl = this.itemList.find((itemEl: MdlSelectableItemComponent) => {
        return (itemEl.item.value || itemEl.item) === this.highlightedItem;
      });
      let offset = selectedEl.el.nativeElement.offsetTop;
      if (offset < this.popover.nativeElement.scrollTop) {
        this.popover.nativeElement.scrollTop = offset;
      }
    };

    if (this.highlightedItem) {
      let highlightedIndex = this.filteredItems().findIndex((item) => {
        return (typeof item === "string") ? item === this.highlightedItem : item.value === this.highlightedItem;
      });

      let nextIndex: number;

      switch ($event.key) {
        case "ArrowDown":
          nextIndex = move(highlightedIndex, 1);
          break;
        case "ArrowUp":
          nextIndex = move(highlightedIndex, -1);
          break;
        case "Enter":
          this.itemSelect(this.filteredItems()[highlightedIndex]);
          this.hideDropdown();
          break;
        default:
          break;
      }
      if (nextIndex >= 0 && nextIndex > highlightedIndex) {
        scrollDown();
      } else if (nextIndex >= 0) {
        scrollUp();
      }
    } else {
      switch ($event.key) {
        case "ArrowDown":
          this.highlightedItem = this.filteredItems()[0].value || this.filteredItems()[0];
          break;
        case "ArrowUp":
          this.highlightedItem = this.filteredItems()[this.filteredItems().length - 1].value
            || this.filteredItems()[this.filteredItems().length - 1];
          scrollDown();
          break;
        default:
          break;
      }
    }
  }

  itemSelect(item) {
    this.hideDropdown();
    if (item) {
      let value = (item.value === undefined) ? item : item.value;
      this.inputBox.nativeElement.value = item.label || item;
      this.inputBox.nativeElement.dispatchEvent(new Event("input"));
      this.formControl.setValue(value, {
        emitEvent: false,
        emitModelToViewChange: false
      });
    }
  }

  handleBlur() {
    setTimeout(() => {
      if (this.validItemSelected()) {
        this.hideDropdown();
        return;
      }
      this.itemSelect(this.filteredItems()[0]);
      this.hideDropdown();
    }, 500);
  }

  filteredItems() {
    if (!this.formControl.value || this.validItemSelected()) { return this.items; }

    return this.items.filter((item) => {
      return (item.label || item).toLowerCase().includes(this.formControl.value.toLowerCase());
    });
  }

  validItemSelected() {
    return this.items.map(i => i.value || i).indexOf(this.formControl.value) >= 0;
  }

  setValue(val: any) {
    if (this.items) {
      let item = this.items.find(i => {
        if (i.value === undefined) return i === val;
        else return i.value === val;
      });
      if (item) {
        this.value = val;
        this.itemSelect(item);
      } else {
        this.value = null;
        this.formControl.setValue(null);
      }
    }
  }
}
