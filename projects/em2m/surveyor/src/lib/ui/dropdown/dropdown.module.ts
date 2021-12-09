import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {DropdownComponent} from './dropdown.component';

export * from './dropdown.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    DropdownComponent
  ],
  declarations: [
    DropdownComponent
  ]
})
export class SurveyorDropdownModule {
  static forRoot(): ModuleWithProviders<SurveyorDropdownModule> {
    return {
      ngModule: SurveyorDropdownModule
    };
  }
}
