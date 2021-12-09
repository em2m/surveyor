import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialUpgradeDirective} from './material-upgrade.directive';

export * from './material-upgrade.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MaterialUpgradeDirective
  ],
  exports: [
    MaterialUpgradeDirective
  ]
})
export class SurveyorMaterialModule {
  static forRoot(): ModuleWithProviders<SurveyorMaterialModule> {
    return {
      ngModule: SurveyorMaterialModule
    };
  }
}
