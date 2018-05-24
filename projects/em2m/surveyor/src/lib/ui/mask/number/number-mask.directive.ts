import {Directive, Output, EventEmitter, ElementRef} from '@angular/core';

@Directive({
  selector: '[number]',
  host: {
    '(ngModelChange)': 'onInputChange($event)',
    '(keydown.backspace)': 'onInputChange($event.target.value, true)',
  }
})
export class NumberMaskDirective {
  constructor(private el: ElementRef) {
  }


  @Output() rawChange = new EventEmitter<string>();

  onInputChange(event) {
    // remove all mask characters (keep only numeric)
    if (!event) {
      this.el.nativeElement.value = '';
      return;
    }
    let newVal = event.toString().replace(/\D/g, '');
    let rawValue = newVal;
    // set the new value
    this.el.nativeElement.value = newVal;
    this.rawChange.emit(rawValue);
  }
}
