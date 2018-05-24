import {Directive, Output, EventEmitter, ElementRef} from '@angular/core';

@Directive({
  selector: '[phone]',
  host: {
    '(ngModelChange)': 'onInputChange($event)',
    '(keydown.backspace)': 'onInputChange($event.target.value, true)',
  }
})
export class PhoneMaskDirective {
  @Output() rawChange = new EventEmitter<string>();

  constructor(private el: ElementRef) {
  }

  onInputChange(event, backspace) {
    // remove all mask characters (keep only numeric)
    let newVal = event.replace(/\D/g, '');
    let rawValue = newVal;
    // special handling of backspace necessary otherwise
    // deleting of non-numeric characters is not recognized
    // this laves room for improvment for example if you delete in the
    // middle of the string
    if (backspace) {
      newVal = newVal.substring(0, newVal.length - 1);
    }

    // don't show braces for empty value
    if (newVal.length === 0) {
      newVal = '';
    } else if (newVal.length <= 3) {
      newVal = newVal.replace(/^(\d{0,3})/, '($1)');
    } else if (newVal.length <= 6) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '($1) $2');
    } else {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(.*)/, '($1) $2-$3');
    }
    // set the new value
    this.el.nativeElement.value = newVal;
    this.rawChange.emit(rawValue);
  }
}
