import {ModuleWithProviders, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SurveyorFormComponent} from './form.component';
import {SurveyorFormInputWrapperComponent} from './form-input-wrapper.component';
import {CommonModule} from '@angular/common';
import {FileUploadService} from './file-upload.service';
import {FormService} from './form.service';
import {MobileSelectInputComponent} from './plugins/mobile/select-input/select-input.component';
import {MobileNumberInputComponent} from './plugins/mobile/number-input/number-input.component';
import {MaterialFormModule} from './plugins/material/material-form.module';
import {FormServicesPlugin} from './plugins/form-services/form-services-plugin';

export * from './form.component';
export * from './form-input-component';
export * from './form.model';
export * from './form.service';
export * from './form-input-component';
export * from './form-input-wrapper.component';
export * from './file-upload.service';

export * from './plugins/material/material-form.module';

export * from './plugins/form-services/form-services-plugin';

export * from './plugins/mobile/select-input/select-input.component';
export * from './plugins/mobile/number-input/number-input.component';

const components = [
  SurveyorFormComponent,
  SurveyorFormInputWrapperComponent,
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
        {provide: 'PLUGIN', useValue: FormServicesPlugin, multi: true}
      ]
    };
  }
}
