import {AfterContentInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {ControlDefinition, FormDefinition} from './form.model';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'surveyor-form',
  templateUrl: './form.component.html',
  styles: [
    `
      form :last-child {
        margin-right: 8px;
      }
    `
  ]
})
export class SurveyorFormComponent implements OnInit {

  @Input() formDefinition: FormDefinition;
  @Input() asyncValues: any;
  @Input() asyncOptions: any;
  @Input() values: any;
  @Input() readonly = false;
  controlDefinitions: ControlDefinition[];

  @Output() onCreate = new EventEmitter();

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.formDefinition) {
      this.formDefinition.buildForm();
      this.onCreate.emit(true);
      this.controlDefinitions = this.formDefinition.controls;
      this.changeDetector.detectChanges();
    }
  }

  getFormControl(def: ControlDefinition): AbstractControl {
    return this.formDefinition.form.controls[def.key];
  }
}
