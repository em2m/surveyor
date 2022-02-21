import { Input, Output, EventEmitter, Directive } from "@angular/core";

@Directive()
export abstract class MenuContribution {

  @Input() config: any;
  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor() {
    // this.close.complete()
  }
}
