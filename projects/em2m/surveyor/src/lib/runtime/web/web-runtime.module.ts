import {APP_INITIALIZER, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {ContextService, SurveyorCoreModule} from '../../core/core.module';
import {AppConfig} from '../../core/config/config.service';
import {SurveyorWebRuntime} from './web-runtime.component';
import {BrowserModule, Title} from '@angular/platform-browser';
import {SurveyorMaterialModule} from '../shared/material/material.module';
import {SurveyorDropdownModule, SurveyorMenuModule, SurveyorModalModule, SurveyorPopoverModule, SurveyorUiModule} from '../../ui/ui.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoaderService} from '../shared/loader/loader.service';
import {SurveyorLoaderModule} from '../shared/loader/loader.module';
import {SurveyorSearchModule} from '../../search/search.module';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {LayoutModule} from '@angular/cdk/layout';
import {ApplicationWrapperComponent} from './application/wrapper/wrapper.component';
import {ApplicationUnknownComponent} from './application/unknown/unknown.component';
import {ApplicationFooterComponent} from './application/footer/footer.component';
import {ApplicationHeaderComponent} from './application/header/header.component';
import {ApplicationSidenavComponent} from './application/sidenav/sidenav.component';
import {WebContextService} from './context/web-context.service';
import {WebStorageResolver} from './resolvers/storage.resolver';

export * from './web-runtime.component';
export * from './application/footer/footer.component';
export * from './application/header/header.component';
export * from './application/header/header.service';
export * from './application/sidenav/sidenav.component';
export * from './application/sidenav/sidenav.service';
export * from './application/unknown/unknown.component';
export * from './application/wrapper/wrapper.component';
export * from './context/web-context.service';
export * from './resolvers/storage.resolver';

const routes: Routes = [
  {
    path: '',
    data: { target: 'surveyor:core' },
    children: [
      {
        path: 'static',
        data: { target: 'surveyor:static' },
        children: [

        ]
      },
      {
        path: '',
        data: { target: 'surveyor:root'},
        children: [
          {
            path: '',
            component: ApplicationWrapperComponent,
            data: { target: 'surveyor:apps' },
            children: [
              {
                path: '404',
                component: ApplicationUnknownComponent
              },
              /*
              {
                path: "**",
                component: ApplicationUnknownComponent
              }
              */
            ]
          }
        ]
      }
    ]
  }
];

export function webRouteLoader(loader: LoaderService) {
  const res = () => loader.loadRoutes();
  return res;
}

const components = [
  ApplicationFooterComponent,
  ApplicationHeaderComponent,
  ApplicationSidenavComponent,
  ApplicationUnknownComponent,
  ApplicationWrapperComponent
];

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    SurveyorCoreModule.forRoot(),
    SurveyorMaterialModule.forRoot(),
    SurveyorLoaderModule,
    SurveyorUiModule,
    SurveyorSearchModule.forRoot(),
    SurveyorMenuModule,
    SurveyorDropdownModule,
    SurveyorModalModule,
    SurveyorPopoverModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    LayoutModule
  ],
  exports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    SurveyorCoreModule,
    SurveyorMaterialModule,
    SurveyorLoaderModule,
    SurveyorWebRuntime,
    SurveyorUiModule,
    SurveyorSearchModule,
    SurveyorMenuModule,
    SurveyorDropdownModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    LayoutModule,
    ...components
  ],
  declarations: [
    SurveyorWebRuntime,
    ...components
  ],
  bootstrap: [
    SurveyorWebRuntime
  ]
})
export class SurveyorWebRuntimeModule {
  static forRoot(config: any): ModuleWithProviders<SurveyorWebRuntimeModule> {
    return {
      ngModule: SurveyorWebRuntimeModule,
      providers: [
        Title,
        { provide: AppConfig, useValue: new AppConfig(config) },
        { provide: APP_INITIALIZER, useFactory: webRouteLoader, deps: [LoaderService], multi: true },
        { provide: ContextService, useExisting: WebContextService }
      ]
    };
  }
}
