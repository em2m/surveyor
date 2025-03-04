import {ModuleWithProviders, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SurveyorWizardComponent} from './wizard.component';
import {SurveyorWizardStepComponent} from './step.component';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {SurveyorPercentageWizardComponent} from './percentage.wizard.component';
import {Surveyori18nModule} from "../i18n/i18n.module";

export * from './step.component';
export * from './wizard.component';
export * from './wizard.model';
export * from './percentage.wizard.component';

const components = [
  SurveyorWizardComponent,
  SurveyorWizardStepComponent,
  SurveyorPercentageWizardComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    Surveyori18nModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    ...components
  ],
  declarations: [
    ...components
  ]
})
export class SurveyorWizardModule {
  static forRoot(): ModuleWithProviders<SurveyorWizardModule> {
    return {
      ngModule: SurveyorWizardModule,
      providers: [

      ]
    };
  }
}
