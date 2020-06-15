import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {RegionComponent} from './region.component';

export * from './region.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    RegionComponent
  ],
  declarations: [
    RegionComponent
  ],
  entryComponents: [
    RegionComponent
  ]
})
export class SurveyorRegionModule {
  static forRoot(): ModuleWithProviders<SurveyorRegionModule> {
    return {
      ngModule: SurveyorRegionModule,
      providers: []
    };
  }
}
