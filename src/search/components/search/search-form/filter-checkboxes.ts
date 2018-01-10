import {FilterBase} from "./filter-base";
import {FormGroup, FormControl} from "@angular/forms";

export class CheckboxesFilter extends FilterBase<string> {

  controlType = 'checkboxes';
  options: {key: string, value: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }

  toFormGroup(): FormGroup {
    let group: any = {};

    this.options.forEach(option => {
      group[option.key] = new FormControl(false);
    });
    return new FormGroup(group);
  }

}
