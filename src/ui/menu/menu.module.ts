import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TextMenuContribution} from "./text/text-contribution.component";
import {RouterModule} from "@angular/router";

export * from './menu.contribution';
export * from './text/text-contribution.component';
export * from './text/text-contribution.model';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    TextMenuContribution
  ],
  declarations: [
    TextMenuContribution
  ],
  entryComponents: [
    TextMenuContribution
  ]
})
export class SurveyorMenuModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SurveyorMenuModule
    };
  }
}
