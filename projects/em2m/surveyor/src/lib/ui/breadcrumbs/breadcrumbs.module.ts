import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import {BreadcrumbsContribution} from './breadcrumbs-contribution.component';

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
    MatIconModule
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
