import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ActionService} from './action.service';
import {ActionButtonGroupComponent} from './action-button-group.component';
import {ActionButtonSelectionComponent} from './action-button-selection.component';
import {NavigateBackAction} from './actions/back.action';

export * from './action.model';
export * from './action.service';
export * from './action-button-group.component';
export * from './action-button-selection.component';
export * from './actions/back.action';

const components = [
  ActionButtonGroupComponent,
  ActionButtonSelectionComponent
];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [
    ...components
  ],
  declarations: [
    ...components
  ]
})
export class SurveyorActionModule {
  static forRoot(): ModuleWithProviders<SurveyorActionModule> {
    return {
      ngModule: SurveyorActionModule,
      providers: [
        ActionService,
        NavigateBackAction
      ]
    };
  }
}
