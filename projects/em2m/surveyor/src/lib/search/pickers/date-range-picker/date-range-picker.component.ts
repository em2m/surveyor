import {Component, OnInit} from '@angular/core';
import {Picker} from '../../../ui/picker/picker.component';
import {UntypedFormControl} from '@angular/forms';

@Component({
  selector: 'surveyor-searcher-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss']
})
export class DateRangePickerComponent extends Picker implements OnInit{
  fromDate: Date;
  toDate: Date;
  dateToday: Date = new Date();
  formFromControl = new UntypedFormControl('');
  formToControl = new UntypedFormControl('');

  constructor() {
    super();
  }

  ngOnInit() {
    this.fromDate = new Date(this.params?.fromDate);
    this.formFromControl.setValue(this.fromDate);
    this.toDate = new Date(this.params?.toDate);
    this.formToControl.setValue(this.toDate);
  }

  fromDateChanged(event) {
    if (event.value === null) {
      return;
    }
    this.fromDate = event.value;
  }

  toDateChanged(event) {
    if (event.value === null) {
      return;
    }
    this.toDate = event.value;
  }

  canSubmit(): boolean {
    return this.formFromControl.valid && this.formToControl.valid;
  }

  submit() {
    this.pick({
      from: this.fromDate,
      to: this.toDate
    });
  }
}
