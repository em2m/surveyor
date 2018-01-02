import {Input, Output, EventEmitter} from "@angular/core";

export abstract class MenuContribution {

  @Input() config: any;
  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor() {
    // this.close.complete()
  }
}
