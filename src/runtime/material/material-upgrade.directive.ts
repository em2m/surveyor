import {Directive, AfterViewChecked} from '@angular/core';
import "material-design-lite";

declare let componentHandler: any;

@Directive({
  selector: '[mdl]'
})
export class MaterialUpgradeDirective implements AfterViewChecked {

  constructor() {
  }

  ngAfterViewChecked() {
    if (componentHandler) {
      componentHandler.upgradeAllRegistered();
    }
  }
}
