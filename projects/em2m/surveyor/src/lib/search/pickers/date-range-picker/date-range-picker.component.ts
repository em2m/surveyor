import {Component} from '@angular/core';
import {Picker} from '../../../ui/picker/picker.component';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'surveyor-searcher-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: [ './date-range-picker.component.scss' ]
})
export class DateRangePickerComponent extends Picker {

  fromDate: Date;
  toDate: Date;
  formFromControl = new FormControl('');
  formToControl = new FormControl('');

  constructor() {
    super();
  }

  fromDateChanged(event) {
    if (event.value === null){
      return ;
    }
    this.fromDate = event.value;
  }

  toDateChanged(event) {
    if (event.value === null){
      return ;
    }
    this.toDate = event.value;
  }

  canSubmit(): boolean {
    return !!this.fromDate && !!this.toDate;
  }

  submit() {
    this.pick({
      from: this.fromDate,
      to: this.toDate
    });
  }
}
