import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MaskUtils} from "./mask.util";
import {NumberMaskDirective} from "./number/number-mask.directive";
import {PhoneMaskDirective} from "./phone/phone-mask.directive";

export * from './mask.model';
export * from './mask.util';
export * from './number/number-mask.directive';
export * from './phone/phone-mask.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    NumberMaskDirective,
    PhoneMaskDirective
  ],
  declarations: [
    NumberMaskDirective,
    PhoneMaskDirective
  ]
})
export class SurveyorMaskModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SurveyorMaskModule,
      providers: [
        MaskUtils
      ]
    };
  }
}
