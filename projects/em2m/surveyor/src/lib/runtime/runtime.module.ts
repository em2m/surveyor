import {APP_INITIALIZER, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {SurveyorApplicationModule} from './application/application.module';
import {SurveyorCoreModule} from '../core/core.module';
import {AppConfig} from '../core/config/config.service';
import {SurveyorRuntimeComponent} from './runtime.component';
import {BrowserModule, Title} from '@angular/platform-browser';
import {SurveyorMaterialModule} from './material/material.module';
import {SurveyorUiModule} from '../ui/ui.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoaderService} from './loader/loader.service';
import {SurveyorLoaderModule} from './loader/loader.module';
import {SurveyorSearchModule} from '../search/search.module';

export * from './runtime.component';
export * from './application/application.module';
export * from './material/material.module';
export * from './loader/loader.module';

export function configFactory(config: AppConfig) {
  const res = () => config.load();
  return res;
}

export function routeLoader(loader: LoaderService) {
  const res = () => loader.loadRoutes();
  return res;
}

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    SurveyorCoreModule.forRoot(),
    SurveyorApplicationModule,
    SurveyorMaterialModule.forRoot(),
    SurveyorUiModule,
    SurveyorSearchModule.forRoot()
  ],
  exports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    SurveyorCoreModule,
    SurveyorApplicationModule,
    SurveyorMaterialModule,
    SurveyorLoaderModule,
    SurveyorRuntimeComponent,
    SurveyorUiModule,
    SurveyorSearchModule
  ],
  declarations: [
    SurveyorRuntimeComponent
  ],
  bootstrap: [
    SurveyorRuntimeComponent
  ]
})
export class SurveyorRuntimeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SurveyorRuntimeModule,
      providers: [
        Title,
        {
          provide: APP_INITIALIZER,
          useFactory: configFactory,
          deps: [AppConfig],
          multi: true
        },
        {
          provide: APP_INITIALIZER,
          useFactory: routeLoader,
          deps: [LoaderService],
          multi: true
        }
      ]
    };
  }
}
