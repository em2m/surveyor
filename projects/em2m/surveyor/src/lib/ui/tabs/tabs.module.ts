import {ModuleWithProviders, NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {TabsService} from "./tabs.service";
import {HorizontalTabsComponent} from "./horizontal/horizontal-tabs.component";
import {HorizontalTabsPage} from "./horizontal/horizontal-tabs.page";
import {VerticalTabsComponent} from "./vertical/vertical-tabs.component";
import {VerticalTabsPage} from "./vertical/vertical-tabs.page";

export * from './horizontal/horizontal-tabs.component';
export * from './horizontal/horizontal-tabs.page';
export * from './vertical/vertical-tabs.component';
export * from './vertical/vertical-tabs.page';
export * from './tabs.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HorizontalTabsComponent,
    HorizontalTabsPage,
    VerticalTabsComponent,
    VerticalTabsPage
  ],
  declarations: [
    HorizontalTabsComponent,
    HorizontalTabsPage,
    VerticalTabsComponent,
    VerticalTabsPage
  ],
  entryComponents: [
    HorizontalTabsComponent,
    HorizontalTabsPage,
    VerticalTabsComponent,
    VerticalTabsPage
  ]
})
export class SurveyorTabsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SurveyorTabsModule,
      providers: [
        TabsService
      ]
    };
  }
}
