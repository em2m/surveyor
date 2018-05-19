import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {PickerService} from "./picker.service";
import {TimeZonePicker} from "./pickers/time-zone-picker/time-zone-picker.component";
import {PickerPlugin} from "./picker.plugin";
import {SurveyorModalModule} from "../modal/modal.module";

export * from './picker.component';
export * from './picker.model';
export * from './picker.service';
export * from './picker.plugin';
export * from './pickers/time-zone-picker/time-zone-picker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SurveyorModalModule
  ],
  exports: [
    TimeZonePicker
  ],
  declarations: [
    TimeZonePicker
  ],
  entryComponents: [
    TimeZonePicker
  ]
})
export class SurveyorPickerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SurveyorPickerModule,
      providers: [
        PickerService,
        {provide: "PLUGIN", useValue: PickerPlugin, multi: true}
      ]
    };
  }
}
