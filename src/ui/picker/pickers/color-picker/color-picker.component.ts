import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Picker} from "../../picker.component";

@Component({
  selector: 'surveyor-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPicker extends Picker implements OnInit {

  @ViewChild("navColorInput") navColorInput: ElementRef;
  color = "#127bdc";

  constructor() {
    super();
  }

  ngOnInit() {
    this.color = this.params.value;
  }

  triggerColorSelect() {
    const event = this.getClickEvent();
    this.navColorInput.nativeElement.dispatchEvent(event);
  }

  colorChanged(color) {
    this.color = color;
    this.pick(color);
  }

  getClickEvent(): MouseEvent {
    return new MouseEvent('click', {
      'view': window,
      'bubbles': true,
      'cancelable': true
    });
  }
}
