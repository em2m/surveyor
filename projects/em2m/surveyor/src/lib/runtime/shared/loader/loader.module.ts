import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoaderService} from './loader.service';
import {RouterModule} from '@angular/router';

export * from './loader.service';

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
