import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MdlModule} from "@angular-mdl/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SortComponent} from "./components/search/sort/sort.component";
import {TotalResultComponent} from "./components/total-results/total-results.component";
import {StandardFacetComponent} from "./components/standard-facet/standard-facet.component";
import {SearchPlugin} from "./search.plugin";
import {PickerService} from "../ui/picker/picker.service";
import {QueryPickerComponent} from "./pickers/query-picker/query-picker.component";
import {SearcherInputComponent} from "./components/search/search-input/searcher-input.component";
import {TermPickerComponent} from "./pickers/term-picker/term-picker.component";
import {ToggleRecursiveComponent} from "./components/toggle-recursive/toggle-recursive.component";
import {ToggleArchivedComponent} from "./components/toggle-archived/toggle-archived.component";
import {SurveyorRegionModule} from "../ui/region/region.module";

export * from './shared/query.model';
export * from './shared/searcher.model';
export * from './components/search/sort/sort.component';
export * from './components/search/sort/sort.model';
export * from './components/search/search-input/searcher-input.component';
export * from './components/total-results/total-results.component';
export * from './components/toggle-archived/toggle-archived.component';
export * from './components/standard-facet/standard-facet.component';
export * from './components/toggle-recursive/toggle-recursive.component';
export * from './pickers/term-picker/term-picker.component';
export * from './pickers/query-picker/query-picker.component';
export * from './search.plugin';

const components: any[] = [
  SortComponent,
  TotalResultComponent,
  StandardFacetComponent,
  ToggleRecursiveComponent,
  ToggleArchivedComponent,
  TermPickerComponent,
  QueryPickerComponent,
  SearcherInputComponent
];

@NgModule({
  imports: [
    CommonModule,
    MdlModule,
    FormsModule,
    ReactiveFormsModule,
    SurveyorRegionModule
  ],
  exports: [
    ...components,
    ReactiveFormsModule
  ],
  declarations: [
    ...components
  ],
  entryComponents: [
    ...components
  ]
})
export class SurveyorSearchModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SurveyorSearchModule,
      providers: [
        PickerService,
        {provide: "PLUGIN", useValue: SearchPlugin, multi: true}
      ]
    };
  }
}
