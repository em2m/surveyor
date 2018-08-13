import {Component, AfterViewInit, OnInit} from '@angular/core';
import {SurveyorFormInputComponent} from '../../../form-input-component';

@Component({
  selector: 'surveyor-mat-select-input',
  templateUrl: './mat-select.component.html',
  styleUrls: ['./mat-select.component.scss']
})
export class MaterialSelectInputComponent extends SurveyorFormInputComponent implements AfterViewInit {

  items: any[];

  ngAfterViewInit() {
    this.items = JSON.parse(JSON.stringify(this.controlDefinition.options.selections || []));

    let values = this.items.map(item => {
      if (item === undefined) {
        return item;
      } else {
        return item.value;
      }
    });

    if (this.controlDefinition.value instanceof Array) {
      this.setValue(this.controlDefinition.value);
    } else {
      if (values.indexOf(this.controlDefinition.value) > -1) {
        this.setValue(this.controlDefinition.value);
      } else {
        this.setValue(null);
      }
    }
  }
}
