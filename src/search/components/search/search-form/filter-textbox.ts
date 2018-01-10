import {FilterBase} from "./filter-base";
import {FormGroup} from "@angular/forms";

export class TextboxFilter extends FilterBase<string> {
  controlType = 'textbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }

  toFormGroup(): FormGroup {
    return null;
  }
}
