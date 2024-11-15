import {Component, ComponentFactoryResolver, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {ControlDefinition} from './form.model';
import {UntypedFormControl} from '@angular/forms';

@Component({
  selector: 'surveyor-form-input',
  template: '<div #inputTarget></div>'
})
export class SurveyorFormInputWrapperComponent implements OnInit, OnDestroy {

  @ViewChild('inputTarget', {read: ViewContainerRef, static: true}) inputTarget: any;
  @Input() controlDefinition: ControlDefinition;
  @Input() controlInstance: UntypedFormControl;
  @Input() asyncValues: any;
  @Input() asyncOptions: any;
  @Input() value: any;
  _readonly = false;
  @Input() set readonly(bool) {
    this._readonly = bool;
    if (this.controlInstance) {
      if (this._readonly) {
        this.controlInstance.disable();
      } else {
        this.controlInstance.enable();
      }
    }
  }

  get readonly() {
    return this._readonly;
  }

  @Output() onValueChange = new EventEmitter();

  currentComponent: any;
  private asyncValSubscription: any;
  private asyncOptsSubscription: any;

  constructor(private resolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(this.controlDefinition.component);
    const component = this.inputTarget.createComponent(factory);
    component.instance.controlDefinition = this.controlDefinition;
    component.instance.formControl = this.controlInstance;
    component.instance.readonly = this.readonly;

    this.controlInstance.valueChanges.subscribe(() => {
      setTimeout(() => {
        this.onValueChange.emit(true);
      }, 0);
    });
    this.inputTarget.insert(component.hostView);

    if (this.currentComponent) {
      this.currentComponent.destroy();
    }
    this.currentComponent = component;
    const syncVal = this.controlDefinition.value;
    if (syncVal && this.currentComponent) {
      this.currentComponent.instance.setValue(syncVal);
    }

    if (this.asyncValues && this.asyncValues.subscribe) {
      this.asyncValSubscription = this.asyncValues.subscribe((vals: any) => {
        const val = vals[this.controlDefinition.key];
        if (val && this.currentComponent) {
          this.currentComponent.instance.setValue(val);
        }
      });
    }

    if (this.asyncOptions && this.asyncOptions.subscribe) {
      this.asyncOptsSubscription = this.asyncOptions.subscribe((data: any) => {
        const opts = data[this.controlDefinition.key];
        if (opts && this.currentComponent) {
          this.currentComponent.instance.setOptions(opts);
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.asyncValSubscription) {
      this.asyncValSubscription.unsubscribe();
    }
    if (this.asyncOptsSubscription) {
      this.asyncOptsSubscription.unsubscribe();
    }
  }
}
