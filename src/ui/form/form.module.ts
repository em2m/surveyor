import {ModuleWithProviders, NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SurveyorFormComponent} from "./form.component";
import {SurveyorFormInputWrapperComponent} from "./form-input-wrapper.component";
import {CommonModule} from "@angular/common";
import {FileUploadService} from "./file-upload.service";
import {FormService} from "./form.service";
import {MdlFormPlugin} from "./plugins/mdl/mdl-form-plugin";
import {MdlTextInputComponent} from "./plugins/mdl/text-input/text-input.component";
import {MdlTextAreaInputComponent} from "./plugins/mdl/text-area-input/text-area-input.component";
import {MdlSelectInputComponent} from "./plugins/mdl/select-input/select-input.component";
import {MdlSelectableItemComponent} from "./plugins/mdl/select-input/selectable-item.component";
import {FormServicesPlugin} from "./plugins/form-services/form-services-plugin";
import {MdlCheckboxInputComponent} from "./plugins/mdl/checkbox-input/checkbox-input.component";
import {ConfirmedPasswordInputComponent} from "./plugins/mdl/confirmed-password-input/confirmed-password-input.component";
import {MdlPopoverModule} from "@angular-mdl/popover";
import {MdlModule} from "@angular-mdl/core";
import {MdlPickerInputComponent} from "./plugins/mdl/picker-input/picker-input.component";
import {MdlPasswordInputComponent} from "./plugins/mdl/password-input/password-input.component";

export * from "./form.component";
export * from "./form-input-component";
export * from "./form.model";
export * from "./form.service";
export * from "./form-input-component";
export * from "./form-input-wrapper.component";
export * from "./file-upload.service";

export * from "./plugins/mdl/mdl-form-plugin";
export * from "./plugins/form-services/form-services-plugin";

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
  ConfirmedPasswordInputComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdlPopoverModule,
    MdlModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
        {provide: "PLUGIN", useValue: MdlFormPlugin, multi: true},
        {provide: "PLUGIN", useValue: FormServicesPlugin, multi: true}
      ]
    };
  }
}
