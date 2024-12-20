import {NgModule} from '@angular/core';
import {SurveyorActionModule} from './action/action.module';
import {SurveyorBreadcrumbsModule} from './breadcrumbs/breadcrumbs.module';
import {SurveyorCardModule} from './card/card.module';
import {SurveyorDropdownModule} from './dropdown/dropdown.module';
import {SurveyorFormModule} from './form/form.module';
import {SurveyorIntentModule} from './intent/intent.module';
import {SurveyorLeafletModule} from './leaflet/leaflet.module';
import {SurveyorMaskModule} from './mask/mask.module';
import {SurveyorMenuModule} from './menu/menu.module';
import {SurveyorModalModule} from './modal/modal.module';
import {SurveyorPaginationModule} from './pagination/pagination.module';
import {SurveyorPickerModule} from './picker/picker.module';
import {SurveyorTableModule} from './table/table.module';
import {SurveyorTabsModule} from './tabs/tabs.module';
import {SurveyorToastModule} from './toast/toast.module';
import {SurveyorRegionModule} from './region/region.module';
import {SurveyorGeoModule} from './geo/geo.module';
import {SurveyorWizardModule} from './wizard/wizard.module';
import {SurveyorPopoverModule} from './popover/popover.module';
import {SurveyorConverterModule} from './converter/converter.module';
// import {Surveyori18nModule} from "./i18n/i18n.module";

export * from './action/action.module';
export * from './breadcrumbs/breadcrumbs.module';
export * from './card/card.module';
export * from './converter/converter.module';
export * from './dropdown/dropdown.module';
export * from './form/form.module';
export * from './geo/geo.module';
export * from './intent/intent.module';
export * from './leaflet/leaflet.module';
export * from './mask/mask.module';
export * from './menu/menu.module';
export * from './modal/modal.module';
export * from './pagination/pagination.module';
export * from './picker/picker.module';
export * from './popover/popover.module';
export * from './region/region.module';
export * from './table/table.module';
export * from './tabs/tabs.module';
export * from './toast/toast.module';
export * from './wizard/wizard.module';
// export * from './i18n/i18n.module';

@NgModule({
  imports: [
    SurveyorActionModule.forRoot(),
    SurveyorBreadcrumbsModule.forRoot(),
    SurveyorCardModule.forRoot(),
    SurveyorConverterModule.forRoot(),
    SurveyorDropdownModule.forRoot(),
    SurveyorFormModule.forRoot(),
    SurveyorGeoModule.forRoot(),
    SurveyorIntentModule.forRoot(),
    SurveyorLeafletModule.forRoot(),
    SurveyorMaskModule.forRoot(),
    SurveyorMenuModule.forRoot(),
    SurveyorModalModule.forRoot(),
    SurveyorPaginationModule.forRoot(),
    SurveyorPickerModule.forRoot(),
    SurveyorPopoverModule.forRoot(),
    SurveyorRegionModule.forRoot(),
    SurveyorTableModule.forRoot(),
    SurveyorTabsModule.forRoot(),
    SurveyorToastModule.forRoot(),
    SurveyorWizardModule.forRoot()
  ],
  exports: [
    SurveyorActionModule,
    SurveyorBreadcrumbsModule,
    SurveyorCardModule,
    SurveyorConverterModule,
    SurveyorDropdownModule,
    SurveyorFormModule,
    SurveyorGeoModule,
    SurveyorIntentModule,
    SurveyorLeafletModule,
    SurveyorMaskModule,
    SurveyorMenuModule,
    SurveyorModalModule,
    SurveyorPaginationModule,
    SurveyorPickerModule,
    SurveyorPopoverModule,
    SurveyorRegionModule,
    SurveyorTableModule,
    SurveyorTabsModule,
    SurveyorToastModule,
    SurveyorWizardModule,
    // Surveyori18nModule
  ]
})
export class SurveyorUiModule {
}
