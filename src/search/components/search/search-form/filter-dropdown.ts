import {FilterBase} from "./filter-base";
import {FormGroup} from "@angular/forms";

export class DropdownFilter extends FilterBase<string> {
  controlType = 'dropdown';
  options: {key: string, value: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }

  toFormGroup(): FormGroup {
    return null;
  }
}
