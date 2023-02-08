import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Title } from '@angular/platform-browser';
import { CapacitorRootPage } from './application/root/root.page';
import { Capacitor404Page } from './application/404/404.page';
import { CapacitorWrapperPage } from './application/wrapper/wrapper.page';
import {
  LoaderService,
  SurveyorLoaderModule
} from '../shared/loader/loader.module';
import { SurveyorCapacitorRuntime } from './capacitor-runtime.component';
import { SurveyorMaterialModule } from '../shared/material/material.module';
import { SurveyorPopoverModule } from '../../ui/popover/popover.module';
import { AppConfig } from '../../core/config/config.service';
import { ContextService, SurveyorCoreModule } from '../../core/core.module';
import { SurveyorModalModule } from '../../ui/modal/modal.module';
import { SurveyorFormModule } from '../../ui/form/form.module';
import { CapacitorContextService } from './context/capacitor-context.service';
import { StorageGuard } from './guards/storage.guard';
import { DeviceInfoGuard } from './guards/device-info.guard';
import {DeeplinksService} from "./deeplinks/DeeplinksService";

export * from './capacitor-runtime.component';
export * from './application/404/404.page';
export * from './application/root/root.page';
export * from './resolvers/device-info.resolver';
export * from './resolvers/storage.resolver';
export * from './guards/device-info.guard';
export * from './guards/storage.guard';
export * from './context/capacitor-context.service';
export * from './application/wrapper/wrapper.page';

const components: any[] = [
  SurveyorCapacitorRuntime,
  CapacitorRootPage,
  CapacitorWrapperPage,
  Capacitor404Page
];

const routes: Routes = [
  {
    path: '',
    component: CapacitorRootPage,
    data: { target: 'surveyor:root' },
    // resolve: { deviceInfo: DeviceInfoResolver, storage: StorageResolver },
    canActivate: [StorageGuard, DeviceInfoGuard],
    children: [
      {
        path: '',
        component: CapacitorWrapperPage,
        data: { target: 'surveyor:apps' },
        children: [
          {
            path: '404',
            component: Capacitor404Page
          }
        ]
      }
      /*
      {
        path: '404',
        component: Capacitor404Page
      },
       */
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
  declarations: [...components]
})
export class SurveyorCapacitorRuntimeModule {
  static forRoot(
    config: any
  ): ModuleWithProviders<SurveyorCapacitorRuntimeModule> {
    return {
      ngModule: SurveyorCapacitorRuntimeModule,
      providers: [
        Title,
        { provide: AppConfig, useValue: new AppConfig(config) },
        {
          provide: APP_INITIALIZER,
          useFactory: capacitorRouteLoader,
          deps: [LoaderService],
          multi: true
        },
        { provide: ContextService, useExisting: CapacitorContextService },
        DeeplinksService
        // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
      ]
    };
  }
}
