import {AsyncValidatorFn, FormBuilder, FormGroup, ValidatorFn} from '@angular/forms';

export interface ControlValidator {
  key: string;
  validator: ValidatorFn|string;
  params?: any;
  message: string;
}

export interface AsyncControlValidator {
  key: string;
  validator: AsyncValidatorFn|string;
  params?: any;
  message: string;
}

export interface Mask {
  masker: Function | string;
  params?: Array<any>|any;
}

export interface ControlOptions {
  key: string;
  label: string;
  component: any;
  value?: any;
  disabled?: boolean;
  required?: boolean;
  hidden?: boolean;
  options?: any;
  validators?: ControlValidator[];
  asyncValidators?: AsyncControlValidator[];
  width?: string;
}

export class ControlDefinition {
  key: string;
  label: string;
  component: any;
  value: any;
  disabled: boolean;
  required: boolean;
  hidden: boolean;
  options: any;
  validators: ControlValidator[];
  asyncValidators: AsyncControlValidator[];
  mask: Function;
  width?: string;

  constructor(data: ControlOptions) {
    this.key = data.key;
    this.label = data.label;
    this.component = data.component;
    this.value = data.value;
    this.disabled = data.disabled || false;
    this.required = data.required || false;
    this.hidden = data.hidden || false;
    this.options = data.options || {};
    this.validators = data.validators || [];
    this.asyncValidators = data.asyncValidators || [];
    this.width = data.width || '12';
  }

  buildFormControl() {
    return [
      {
        value: this.value,
        disabled: this.disabled
      },
      this.validators.map(v => v.validator),
      this.asyncValidators.map(v => v.validator)
    ];
  }
}

export class FormDefinition {
  controls: ControlDefinition[];
  formBuilder: FormBuilder;
  form: FormGroup;

  constructor(controls:  ControlOptions[], formBuilder: FormBuilder) {
    this.controls = controls.map( ctrl => new ControlDefinition(ctrl));
    this.formBuilder = formBuilder;
  }

  buildForm() {
    let formControls = {};
    this.controls.forEach((control) => {
      formControls[control.key] = control.buildFormControl();
    });
    this.form = this.formBuilder.group(formControls);
    return this.form;
  }

  getValues(): any {
    let values = {};
    if (this.form) {
      this.controls.forEach((control) => {
        values[control.key] = this.form.controls[control.key].value;
      });
    }
    return values;
  }

  getValidity(): boolean {
    if (!this.form) {
      return false;
    }
    return this.form.valid;
  }

  pristine(): boolean {
    if (!this.form) {
      return false;
    }
    return this.form.pristine;
  }

  markAllAsTouched() {
    if (this.form) {
      Object.keys(this.form.controls).forEach(controlKey => {
        this.form.controls[controlKey].markAsTouched();
      });
    }
  }
}

export interface FormUpdateEvent {
  key: string;
  value: any;
}
