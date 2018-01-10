import {Component, Input, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'surveyor-search-dropdown',
  templateUrl: 'search-dropdown.component.html',
  styleUrls: ['./search-dropdown.component.scss']
})
export class SearchDropdownComponent implements OnInit {

  @Input() title: string;
  @Input() width = 300;
  @Input() model: Array<string> = [];
  @Input() form: FormGroup;
  @Input() inputName: string;

  private input = '';
  private filteredItems: Array<any> = [];
  private selectRef: any;
  private inputRef: any;

  public selectedItem: string;

  constructor() {
  }

  ngOnInit() {
    this.filteredItems = JSON.parse(JSON.stringify(this.model));
  }

  toggle(inputElement: any, selectElement: any, visibility: string) {

    if (this.selectRef == null) {
      this.selectRef = selectElement;
    }

    if (this.inputRef == null) {
      this.inputRef = inputElement;
    }

    if (visibility === 'hidden') {
      setTimeout(() => {
        this.selectRef.style.visibility = 'hidden';
        this.inputRef.value = '';
        this.inputRef.value = this.selectedItem;

      }, 100);
    } else {
      this.selectRef.style.visibility = visibility;
    }
  }

  itemSelect(item) {
    this.selectedItem = item;
    this.inputRef.value = item || "";

    if (this.form) {
      this.form.controls[this.inputName].setValue(item || "");
    }
  }

  filterItems(input) {
    this.input = input.value;
    if (input.value === "") {
      this.itemSelect(input.value);
    }

    this.filteredItems = this.model.filter((item) => {
      return item.toLowerCase().includes(this.input.toLowerCase());
    });
  }
}
