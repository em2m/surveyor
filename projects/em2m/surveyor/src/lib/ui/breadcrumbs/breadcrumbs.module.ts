import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import {BreadcrumbsContribution} from './breadcrumbs-contribution.component';
import {Surveyori18nModule} from "../i18n/i18n.module";

export * from './breadcrumbs.model';
export * from './breadcrumbs-contribution.component';
export * from './breadcrumb.service';

const components = [
  BreadcrumbsContribution
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    Surveyori18nModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    ...components
  ],
  declarations: [
    ...components
  ]
})
export class SurveyorBreadcrumbsModule {
  static forRoot(): ModuleWithProviders<SurveyorBreadcrumbsModule> {
    return {
      ngModule: SurveyorBreadcrumbsModule,
      providers: []
    };
  }
}
