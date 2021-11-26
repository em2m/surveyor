import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StandardPopoverContainer} from './containers/standard/standard-popover-container.component';
import {PopoverService} from './popover.service';

export * from './popover.component';
export * from './popover.model';
export * from './popover.service';
export * from './popover-container.component';
export * from './containers/standard/standard-popover-container.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    StandardPopoverContainer,
  ],
  declarations: [
    StandardPopoverContainer
  ]
})
export class SurveyorPopoverModule {
  static forRoot(): ModuleWithProviders<SurveyorPopoverModule> {
    return {
      ngModule: SurveyorPopoverModule,
      providers: [
        PopoverService
      ]
    };
  }
}
