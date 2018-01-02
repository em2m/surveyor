import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TableComponent} from "./table.component";
import {MdlModule} from "@angular-mdl/core";
import {FormsModule} from "@angular/forms";

export * from './table.component';
export * from './table.model';

@NgModule({
  imports: [
    CommonModule,
    MdlModule,
    FormsModule
  ],
  exports: [
    TableComponent
  ],
  declarations: [
    TableComponent
  ],
  entryComponents: [
    TableComponent
  ]
})
export class SurveyorTableModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SurveyorTableModule
    };
  }
}
