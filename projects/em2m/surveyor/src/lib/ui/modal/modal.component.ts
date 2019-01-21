import {EventEmitter, Output, Input, HostListener} from "@angular/core";

export abstract class Modal {

  @Input() params: any;
  @Output() onSubmit = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.cancel();
  }

  constructor() {
  }

  canSubmit(): boolean {
    return true;
  }

  submit() {
    this.onSubmit.emit();
  }

  submitWithValue(value: any) {
    this.onSubmit.emit(value);
  }

  cancel() {
    this.onCancel.emit();
  }

  delete() {
    this.onDelete.emit();
  }
}
