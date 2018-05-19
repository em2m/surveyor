import {Modal} from "../modal/modal.component";

export abstract class Picker extends Modal {

  constructor() {
    super();
  }

  pick(value: any) {
    this.onSubmit.emit(value);
  }
}
