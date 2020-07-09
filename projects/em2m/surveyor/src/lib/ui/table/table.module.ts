import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableComponent} from './table.component';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';

export * from './table.component';
export * from './table.model';

@NgModule({
  imports: [CommonModule, MatCheckboxModule, FormsModule],
  exports: [TableComponent],
  declarations: [TableComponent]
})
export class SurveyorTableModule {
  static forRoot(): ModuleWithProviders<SurveyorTableModule> {
    return {
      ngModule: SurveyorTableModule
    };
  }
}
