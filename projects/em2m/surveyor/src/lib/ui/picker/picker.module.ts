import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PickerService} from './picker.service';
import {TimeZonePicker} from './pickers/time-zone-picker/time-zone-picker.component';
import {ColorPicker} from './pickers/color-picker/color-picker.component';
import {PickerPlugin} from './picker.plugin';
import {SurveyorModalModule} from '../modal/modal.module';
import {MatInputModule} from '@angular/material/input';
import {Surveyori18nModule} from "../i18n/i18n.module";

export * from './picker.component';
export * from './picker.model';
export * from './picker.service';
export * from './picker.plugin';
export * from './pickers/color-picker/color-picker.component';
export * from './pickers/time-zone-picker/time-zone-picker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SurveyorModalModule,
    MatInputModule,
    Surveyori18nModule
  ],
  exports: [
    TimeZonePicker,
    ColorPicker
  ],
  declarations: [
    TimeZonePicker,
    ColorPicker
  ]
})
export class SurveyorPickerModule {
  static forRoot(): ModuleWithProviders<SurveyorPickerModule> {
    return {
      ngModule: SurveyorPickerModule,
      providers: [
        PickerService,
        {provide: 'PLUGIN', useValue: PickerPlugin, multi: true}
      ]
    };
  }
}
