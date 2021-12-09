import {CommonModule} from '@angular/common';
import {APP_INITIALIZER, ModuleWithProviders, NgModule} from '@angular/core';
import {IntentPlugin} from './intent-plugin';
import {IntentComponent} from './intent.component';
import {IntentSelectPicker} from './pickers/intent-select/intent-select.picker';
import {IntentService} from './intent.service';

export {IntentPlugin} from './intent-plugin';
export * from './intent.model';
export * from './intent.service';
export * from './intent.guard';
export * from './intent.component';
export * from './pickers/intent-select/intent-select.picker';

export function intentInitializer(intentService: IntentService) {
  const res = () => intentService.registerResolvers();
  return res;
}

const components = [
  IntentComponent,
  IntentSelectPicker
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
    ...components
  ],
  declarations: [
    ...components
  ]
})
export class SurveyorIntentModule {
  static forRoot(): ModuleWithProviders<SurveyorIntentModule> {
    return {
      ngModule: SurveyorIntentModule,
      providers: [
        { provide: APP_INITIALIZER, useFactory: intentInitializer, deps: [IntentService], multi: true },
        {provide: 'PLUGIN', useValue: IntentPlugin, multi: true}
      ]
    };
  }
}
