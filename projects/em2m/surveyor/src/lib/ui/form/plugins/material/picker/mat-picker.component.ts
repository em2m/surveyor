import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {SurveyorFormInputComponent} from '../../../form-input-component';
import {PickerService} from '../../../../picker/picker.service';
import {FormControlDirective} from '@angular/forms';

@Component({
  selector: 'surveyor-mat-picker-input',
  templateUrl: './mat-picker.component.html',
  styleUrls: ['./mat-picker.component.scss']
})
export class MaterialPickerInputComponent extends SurveyorFormInputComponent implements AfterViewInit {

  @ViewChild('picker', {read: FormControlDirective})
  formControlDirective: FormControlDirective;

  label = '';

  constructor(private pickerService: PickerService) {
    super();
  }

  ngAfterViewInit() {
    this.setValue(this.controlDefinition.value);
  }

  setValue(val: any) {
    if (val) {
      const options = this.controlDefinition.options;
      if (options.labelResolver) {
        this.label = options.labelResolver(val);
        this.formControlDirective?.valueAccessor?.writeValue(this.label);
      }
      if (options.valueResolver) {
        this.formControlDirective?.control?.setValue(options.valueResolver(val), { emitModelToViewChange: false });
        this.formControlDirective?.control?.updateValueAndValidity();
      }
    }
  }

  loadPicker() {
    let options = this.controlDefinition.options;
    if (!options.pickerOptions.params) {
      options.pickerOptions.params = {};
    }
    options.pickerOptions.params['value'] = this.formControl.value;
    this.pickerService.pick(options.picker, options.pickerOptions)
      .subscribe((value: any) => {
        this.setValue(value);
        this.formControl.markAsDirty();
      });
  }

}
