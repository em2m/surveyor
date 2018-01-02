import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MdlModule} from "@angular-mdl/core";
import {FormsModule} from "@angular/forms";

export * from './shared/query.model';

@NgModule({
  imports: [
    CommonModule,
    MdlModule,
    FormsModule
  ],
  exports: [],
  declarations: [],
  entryComponents: []
})
export class SurveyorSearchModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SurveyorSearchModule
    };
  }
}
