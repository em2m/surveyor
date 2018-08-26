import {ModuleWithProviders, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SurveyorFormComponent} from './form.component';
import {SurveyorFormInputWrapperComponent} from './form-input-wrapper.component';
import {CommonModule} from '@angular/common';
import {FileUploadService} from './file-upload.service';
import {FormService} from './form.service';
import {MdlFormPlugin} from './plugins/mdl/mdl-form-plugin';
import {MdlTextInputComponent} from './plugins/mdl/text-input/text-input.component';
import {MdlTextAreaInputComponent} from './plugins/mdl/text-area-input/text-area-input.component';
import {FormServicesPlugin} from './plugins/form-services/form-services-plugin';
import {MdlCheckboxInputComponent} from './plugins/mdl/checkbox-input/checkbox-input.component';
import {ConfirmedPasswordInputComponent} from './plugins/mdl/confirmed-password-input/confirmed-password-input.component';
import {MdlPickerInputComponent} from './plugins/mdl/picker-input/picker-input.component';
import {MdlPasswordInputComponent} from './plugins/mdl/password-input/password-input.component';
import {MobileSelectInputComponent} from './plugins/mobile/select-input/select-input.component';
import {MobileNumberInputComponent} from './plugins/mobile/number-input/number-input.component';
import {MdlSelectInputComponent} from './plugins/mdl/select-input/select-input.component';
import {MdlSelectableItemComponent} from './plugins/mdl/select-input/selectable-item.component';
import {MaterialFormModule} from './plugins/material/material-form.module';

export * from './form.component';
export * from './form-input-component';
export * from './form.model';
export * from './form.service';
export * from './form-input-component';
export * from './form-input-wrapper.component';
export * from './file-upload.service';

export * from './plugins/material/material-form.module';

export * from './plugins/mdl/mdl-form-plugin';
export * from './plugins/form-services/form-services-plugin';

export * from './plugins/mobile/select-input/select-input.component';
export * from './plugins/mobile/number-input/number-input.component';

const components = [
  SurveyorFormComponent,
  SurveyorFormInputWrapperComponent,
  MdlPickerInputComponent,
  MdlTextInputComponent,
  MdlTextAreaInputComponent,
  MdlSelectInputComponent,
  MdlSelectableItemComponent,
  MdlCheckboxInputComponent,
  MdlPasswordInputComponent,
  ConfirmedPasswordInputComponent,
  MobileSelectInputComponent,
  MobileNumberInputComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialFormModule.forRoot()
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialFormModule,
    ...components
  ],
  declarations: [
    ...components
  ],
  entryComponents: [
    ...components
  ]
})
export class SurveyorFormModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SurveyorFormModule,
      providers: [
        FileUploadService,
        FormService,
        {provide: 'PLUGIN', useValue: MdlFormPlugin, multi: true},
        {provide: 'PLUGIN', useValue: FormServicesPlugin, multi: true}
      ]
    };
  }
}
