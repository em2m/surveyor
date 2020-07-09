import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PaginationComponent} from "./pagination.component";

export * from "./pagination.component";

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    PaginationComponent
  ],
  declarations: [
    PaginationComponent
  ],
  entryComponents: [
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
