import {Modal} from "../modal/modal.component";
import { Directive } from "@angular/core";

@Directive()
export abstract class Picker extends Modal {

  constructor() {
    super();
  }

  pick(value: any) {
    this.onSubmit.emit(value);
  }
}
