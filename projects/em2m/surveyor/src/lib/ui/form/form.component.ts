import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ControlDefinition, FormDefinition} from './form.model';
import {AbstractControl} from '@angular/forms';
import {BehaviorSubject, Observable} from 'rxjs';
@Component({
  selector: 'surveyor-form',
  templateUrl: './form.component.html',
  styles: [
      `form :last-child {margin-right: 8px;}`,
      `form div {margin-bottom: 8px;}`
  ]
})
export class SurveyorFormComponent implements OnInit {

  private formDefinitionVal: FormDefinition;

  @Input() set formDefinition(changes: any) {
    this.formDefinitionVal = changes;
    if (this.formDefinition) {
      this.formDefinition.buildForm();
      this.onCreate.emit(true);
      this.controlDefinitions = this.formDefinition.controls;
      this.changeDetector.detectChanges();
    }
  }

  get formDefinition() {
    return this.formDefinitionVal;
  }

  private asyncValuesVal = new BehaviorSubject<any>({});
  @Input() set asyncValues(obs: Observable<any>) {
    obs.subscribe(this.asyncValuesVal);
  }
  get asyncValues() {
    return this.asyncValuesVal;
  }

  @Input() asyncOptions: any;
  @Input() values: any;
  @Input() readonly = false;
  controlDefinitions: ControlDefinition[];

  @Output() onCreate = new EventEmitter();
  @Output() onValueChange = new EventEmitter();

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  getFormControl(def: ControlDefinition): AbstractControl {
    return this.formDefinition.form.controls[def.key];
  }

  valueChanged() {
    this.onValueChange.emit(true);
  }
}
