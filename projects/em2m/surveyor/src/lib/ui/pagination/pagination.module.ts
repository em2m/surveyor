import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PaginationComponent} from "./pagination.component";
import {Surveyori18nModule} from "../i18n/i18n.module";

export * from "./pagination.component";

@NgModule({
  imports: [
    CommonModule,
    Surveyori18nModule
  ],
  exports: [
    PaginationComponent
  ],
  declarations: [
    PaginationComponent
  ]
})
export class SurveyorPaginationModule {
  static forRoot(): ModuleWithProviders<SurveyorPaginationModule> {
    return {
      ngModule: SurveyorPaginationModule
    };
  }
}
