import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ContextService} from './extension/context.service';
import {ExtensionService} from './extension/extension.service';
import {StateService} from './state/state.service';
import {NetworkService} from './network/network.service';
import {ToolbarService} from "./toolbar/toolbar.service";

export * from './config/config.service';
export * from './extension/extension.model';
export * from './extension/extension.service';
export * from './extension/context.service';
export * from './extension/filters/action.filter';
export * from './extension/filters/and.filter';
export * from './extension/filters/config.filter';
export * from './extension/filters/context.filter';
export * from './extension/filters/explicit-action.filter';
export * from './extension/filters/filter.util';
export * from './extension/filters/not.filter';
export * from './extension/filters/or.filter';
export * from './extension/filters/route.filter';
export * from './extension/filters/visible.filter';
export * from './state/state.service';
export * from './network/network.service';
export * from './toolbar/toolbar.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    HttpClientModule
  ]
})
export class SurveyorCoreModule {
  static forRoot(): ModuleWithProviders<SurveyorCoreModule> {
    return {
      ngModule: SurveyorCoreModule,
      providers: [
        ContextService,
        ExtensionService,
        StateService,
        NetworkService,
        ToolbarService
      ]
    };
  }
}
