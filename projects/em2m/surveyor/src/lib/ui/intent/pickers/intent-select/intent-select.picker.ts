import {Component} from '@angular/core';
import {Picker} from '../../../picker/picker.component';

@Component({
  templateUrl: './intent-select.picker.html'
})
export class IntentSelectPicker extends Picker {

  constructor() {
    super();
  }
}
