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
  private _formDefinition: FormDefinition;
  
  @Input() set formDefinition(changes: any) {
    this._formDefinition = changes;
    if (this.formDefinition) {
      this.formDefinition.buildForm();
      this.onCreate.emit(true);
      this.controlDefinitions = this.formDefinition.controls;
      this.changeDetector.detectChanges();
    }
  }
  get formDefinition() {
    return this._formDefinition;
  }
  @Input() asyncValues: any;
  @Input() asyncOptions: any;
  @Input() values: any;
  @Input() readonly = false;
  controlDefinitions: ControlDefinition[];

  @Output() onCreate = new EventEmitter();
  @Output() onValueChange = new EventEmitter();

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
  }

  getFormControl(def: ControlDefinition): AbstractControl {
    return this.formDefinition.form.controls[def.key];
  }

  valueChanged() {
    this.onValueChange.emit(true);
  }
}
