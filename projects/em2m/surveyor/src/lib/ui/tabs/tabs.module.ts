import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {TabsService} from './tabs.service';
import {HorizontalTabsComponent} from './horizontal/horizontal-tabs.component';
import {HorizontalTabsPage} from './horizontal/horizontal-tabs.page';
import {VerticalTabsComponent} from './vertical/vertical-tabs.component';
import {VerticalTabsPage} from './vertical/vertical-tabs.page';
import {BottomTabsComponent} from './bottom/bottom-tabs.component';
import {BottomTabsPage} from './bottom/bottom-tabs.page';
import {Surveyori18nModule} from "../i18n/i18n.module";

export * from './horizontal/horizontal-tabs.component';
export * from './horizontal/horizontal-tabs.page';
export * from './vertical/vertical-tabs.component';
export * from './vertical/vertical-tabs.page';
export * from './bottom/bottom-tabs.component';
export * from './bottom/bottom-tabs.page';
export * from './tabs.service';

const components = [
  HorizontalTabsComponent,
  HorizontalTabsPage,
  VerticalTabsComponent,
  VerticalTabsPage,
  BottomTabsComponent,
  BottomTabsPage
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    Surveyori18nModule
  ],
  exports: [
    ...components
  ],
  declarations: [
    ...components
  ]
})
export class SurveyorTabsModule {
  static forRoot(): ModuleWithProviders<SurveyorTabsModule> {
    return {
      ngModule: SurveyorTabsModule
    };
  }
}
