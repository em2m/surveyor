import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {AppConfig} from './config/config.service';
import {ExtensionService} from './extension/extension.service';
import {StateService} from './state/state.service';
import {ContextService} from './extension/context.service';
import {HttpModule} from '@angular/http';

export * from './config/config.service';

export * from './extension/extension.model';
export * from './extension/extension.service';
export * from './extension/context.service';
export * from './extension/filters/action.filter';
export * from './extension/filters/and.filter';
export * from './extension/filters/config.filter';
export * from './extension/filters/context.filter';
export * from './extension/filters/filter.util';
export * from './extension/filters/not.filter';
export * from './extension/filters/or.filter';
export * from './extension/filters/route.filter';
export * from './extension/filters/visible.filter';

export * from './state/state.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    HttpModule,
    HttpClientModule
  ]
})
export class SurveyorCoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SurveyorCoreModule,
      providers: [
        ContextService,
        ExtensionService,
        StateService,
        AppConfig
      ]
    };
  }
}
