import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Surveyori18nLangPipe} from "./pipes/i18n-lang.pipe";
import {Surveyori18nService} from "./shared/i18n.service";

export * from './i18n.module';
export * from './shared/i18n.service';
export * from './pipes/i18n-lang.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    Surveyori18nLangPipe
  ],
  exports: [
    Surveyori18nLangPipe
  ]
})
export class Surveyori18nModule {
  static forRoot(): ModuleWithProviders<Surveyori18nModule> {
    return {
      ngModule: Surveyori18nModule,
      providers: [
        Surveyori18nService
      ]
    };
  }
}
