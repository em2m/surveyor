import {AfterViewInit, Component} from '@angular/core';
import {SurveyorFormInputComponent} from '../../../form-input-component';
import {PickerService} from '../../../../picker/picker.service';
import {MaskedValue} from '../../../../mask/mask.model';
import {Function} from 'estree';

@Component({
  selector: 'surveyor-mat-picker-input',
  templateUrl: './mat-picker.component.html',
  styleUrls: ['./mat-picker.component.scss']
})
export class MaterialPickerInputComponent extends SurveyorFormInputComponent {

  label = '';

  constructor(private pickerService: PickerService) {
    super();
  }

  setValue(val: any) {
    if (val) {
      let options = this.controlDefinition.options;
      if (options.labelResolver) {
        this.label = options.labelResolver(val);
      }
      if (options.valueResolver) {
        this.formControl.setValue(options.valueResolver(val));
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
      });
  }

}
