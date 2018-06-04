import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActionService} from './action.service';
import {ActionButtonGroupComponent} from './action-button-group.component';
import {ActionButtonSelectionComponent} from './action-button-selection.component';
import {NavigateBackAction} from './actions/back.action';
import {MatButtonModule, MatMenuModule, MatIconModule} from '@angular/material';

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
    MatIconModule
  ],
  exports: [
    ...components
  ],
  declarations: [
    ...components
  ],
  entryComponents: [
    ...components
  ]
})
export class SurveyorActionModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SurveyorActionModule,
      providers: [
        ActionService,
        NavigateBackAction
      ]
    };
  }
}
