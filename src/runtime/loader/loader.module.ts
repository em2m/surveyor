import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LoaderService} from "./loader.service";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    LoaderService
  ]
})
export class SurveyorLoaderModule {
}
