import {Component, Input} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {FilterBase} from "./filter-base";

@Component({
  selector: 'surveyor-search-form-filter',
  templateUrl: 'search-form-filter.component.html',
  styleUrls: ['./search-form-filter.component.scss'],
})
export class SearchFormFilterComponent {
  @Input() filter: FilterBase<any>;
  @Input() form: FormGroup;

  get isValid() {
    return this.form.controls[this.filter.key].valid;
  }
}
