import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToastService} from './toast.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {Surveyori18nModule, Surveyori18nService} from "../i18n/i18n.module";

export * from './toast.service';

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule,
    Surveyori18nModule
  ],
  exports: [
    CommonModule,
    MatSnackBarModule
  ]
})
export class SurveyorToastModule {
  static forRoot(): ModuleWithProviders<SurveyorToastModule> {
    return {
      ngModule: SurveyorToastModule,
      providers: [
        Surveyori18nService,
        ToastService
      ]
    };
  }
}
