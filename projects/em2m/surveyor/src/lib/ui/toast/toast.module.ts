import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToastService} from './toast.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';

export * from './toast.service';

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule
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
        ToastService
      ]
    };
  }
}
