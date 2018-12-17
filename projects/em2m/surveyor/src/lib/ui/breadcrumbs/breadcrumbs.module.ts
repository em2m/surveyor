import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatMenuModule, MatIconModule} from '@angular/material';
import {BreadcrumbsContribution} from './breadcrumbs-contribution.component';
import {RouterModule} from '@angular/router';

export * from './breadcrumbs.model';
export * from './breadcrumbs-contribution.component';

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
  ],
  entryComponents: [
    ...components
  ]
})
export class SurveyorBreadcrumbsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SurveyorBreadcrumbsModule,
      providers: []
    };
  }
}
