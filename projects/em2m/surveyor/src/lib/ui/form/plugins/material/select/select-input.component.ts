import {Component, AfterViewInit} from '@angular/core';
import {SurveyorFormInputComponent} from '../../../form-input-component';

@Component({
  selector: 'surveyor-mat-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss']
})
export class MaterialSelectInputComponent extends SurveyorFormInputComponent implements AfterViewInit {

  items: any[];

  ngAfterViewInit() {
    // Hack required to get MDL to bind event handlers after a view change
    this.initialize();
  }

  /*
  setOptions(opts: any) {
    this.controlDefinition.options = opts;
    this.initialize();
  }
  */

  initialize() {
    this.items = JSON.parse(JSON.stringify(this.controlDefinition.options.selections || []));
    let included = this.items.map(item => {
      if (item === undefined) {
        return item;
      } else {
        return item.value;
      }
    }).indexOf(this.controlDefinition.value) > -1;

    console.log('Items: ', this.items);
    console.log('Included: ', included, this.controlDefinition.value);

    if (included) {
      this.setValue(this.controlDefinition.value);
    } else {
      this.setValue(null);
    }
  }

  setValue(value: any) {
    console.log('Setting Value: ', value);

    if (this.items) {
      let item = this.items.find(i => {
        if (i.value === undefined) {
          return i === value;
        } else {
          return i.value === value;
        }
      });

      if (item) {
        this.formControl.setValue(value, {
          emitEvent: false,
          emitModelToViewChange: false
        });
      } else {
        this.formControl.setValue(value, {
          emitEvent: false,
          emitModelToViewChange: false
        });
      }
    }
  }
}
