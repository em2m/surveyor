import {UntypedFormControl} from '@angular/forms';
import {ControlDefinition} from './form.model';

export class SurveyorFormInputComponent {

  controlDefinition: ControlDefinition;
  formControl: UntypedFormControl;
  showErrors = false;
  readonly = false;

  setValue(val: any) {
    this.formControl.setValue(val);
  }

  setOptions(opts: any) {
    this.controlDefinition.options = opts;
  }

  setShowErrors(val: boolean) {
    this.showErrors = val;
  }

  isInvalid(): boolean {
    return this.formControl.errors && (this.formControl.touched); // && this.showErrors;
  }

  getErrors() {
    if (this.isInvalid()) {
      return Object.keys(this.formControl.errors).filter((key: string) => this.formControl.errors[key]);
    }
    return [];
  }

  getErrorMessage(key: string): string {
    let allValidations = this.controlDefinition.validators.concat(this.controlDefinition.asyncValidators);
    let validation = allValidations.find((vdn) => {
      return vdn.key === key;
    });
    return validation ? validation.message : null;
  }
}
