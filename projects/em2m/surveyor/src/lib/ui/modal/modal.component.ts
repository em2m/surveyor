import {EventEmitter, Output, Input, HostListener} from "@angular/core";

export abstract class Modal {

  @Input() params: any;
  @Output() onSubmit = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  private submitted = false;

  constructor() {
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.cancel();
  }

  canSubmit(): boolean {
    return true;
  }

  submit() {
    this.onSubmit.emit();
  }

  submitWithValue(value: any, allowSubmitOnce: boolean = true) {
    if (!this.submitted) {
      this.onSubmit.emit(value);

      if (allowSubmitOnce) {
        this.submitted = true;
      }
    }
  }

  cancel() {
    this.onCancel.emit();
  }

  delete() {
    this.onDelete.emit();
  }
}
