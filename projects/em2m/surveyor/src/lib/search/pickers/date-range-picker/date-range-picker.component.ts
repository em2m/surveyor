import {Component} from '@angular/core';
import {Picker} from '../../../ui/picker/picker.component';

@Component({
  selector: 'surveyor-searcher-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: [ './date-range-picker.component.scss' ]
})
export class DateRangePickerComponent extends Picker {

  fromDate: Date;
  toDate: Date;

  constructor() {
    super();
  }

  fromDateChanged(event) {
    this.fromDate = event.value;
  }

  toDateChanged(event) {
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
