import {APP_INITIALIZER, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Title} from '@angular/platform-browser';
import {CapacitorRootPage} from './application/root/root.page';
import {Capacitor404Page} from './application/404/404.page';
import {DeviceInfoResolver} from './resolvers/device-info.resolver';
import {StorageResolver} from './resolvers/storage.resolver';
import {LoaderService, SurveyorLoaderModule} from '../shared/loader/loader.module';
import {SurveyorCapacitorRuntime} from './capacitor-runtime.component';
import {SurveyorMaterialModule} from '../shared/material/material.module';
import {SurveyorPopoverModule} from '../../ui/popover/popover.module';
import {AppConfig} from '../../core/config/config.service';
import {ContextService, SurveyorCoreModule} from '../../core/core.module';
import {SurveyorModalModule} from '../../ui/modal/modal.module';
import {SurveyorFormModule} from '../../ui/form/form.module';
import {CapacitorContextService} from './context/capacitor-context.service';

export * from './capacitor-runtime.component';
export * from './application/404/404.page';
export * from './application/root/root.page';
export * from './resolvers/device-info.resolver';
export * from './resolvers/storage.resolver';
export * from './context/capacitor-context.service';

const components: any[] = [
  SurveyorCapacitorRuntime,
  CapacitorRootPage,
  Capacitor404Page
];

const routes = [
  {
    path: '',
    component: CapacitorRootPage,
    data: { target: 'surveyor:root' },
    resolve: { deviceInfo: DeviceInfoResolver, storage: StorageResolver },
    children: [
      {
        path: '404',
        component: Capacitor404Page
      },
      /*
      {
        path: "**",
        component: Capacitor404Page,
        data: { priority: 1000 }
      }
      */
    ]
  }
];

export function capacitorRouteLoader(loader: LoaderService) {
  const res = () => loader.loadRoutes();
  return res;
}

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    SurveyorCoreModule.forRoot(),
    SurveyorMaterialModule.forRoot(),
    SurveyorLoaderModule,
    SurveyorModalModule.forRoot(),
    SurveyorPopoverModule.forRoot(),
    SurveyorFormModule.forRoot()
  ],
  exports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    SurveyorCoreModule,
    SurveyorMaterialModule,
    SurveyorLoaderModule,
    SurveyorModalModule,
    SurveyorPopoverModule,
    SurveyorFormModule,
    ...components
  ],
  declarations: [
    ...components
  ],
  entryComponents: [
    ...components
  ]
})
export class SurveyorCapacitorRuntimeModule {
  static forRoot(config: any): ModuleWithProviders {
    return {
      ngModule: SurveyorCapacitorRuntimeModule,
      providers: [
        Title,
        { provide: AppConfig, useValue: new AppConfig(config) },
        { provide: APP_INITIALIZER, useFactory: capacitorRouteLoader, deps: [LoaderService], multi: true },
        { provide: ContextService, useExisting: CapacitorContextService }
        // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
      ]
    };
  }
}
