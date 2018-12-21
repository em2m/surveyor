import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {IntentService} from './intent.service';
import {IntentPlugin} from './intent-plugin';
import {IntentGuard} from './intent.guard';
import {IntentComponent} from './intent.component';
import {IntentSelectPicker} from './pickers/intent-select/intent-select.picker';

export * from './intent.model';
export * from './intent.service';
export * from './intent.guard';
export * from './intent-plugin';
export * from './pickers/intent-select/intent-select.picker';

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
  ],
  entryComponents: [
    ...components
  ]
})
export class SurveyorIntentModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SurveyorIntentModule,
      providers: [
        IntentService,
        IntentGuard,
        {provide: 'PLUGIN', useValue: IntentPlugin, multi: true}
      ]
    };
  }
}
