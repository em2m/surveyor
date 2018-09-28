import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Picker} from "../../picker.component";


@Component({
  selector: 'surveyor-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPicker extends Picker implements OnInit {

  @ViewChild("navColorInput") navColorInput: ElementRef;
  selectedColor = null;
  colors = [
    "#D1237A",
    "#D12323",
    "#D17A23",
    "#D1D123",
    "#7AD123",
    "#23D123",
    "#23D17A",
    "#23D1D1",
    "#237AD1",
    "#2323D1",
    "#7A23D1",
    "#D123D1",
  ]
  constructor() {
    super();
  }

  ngOnInit() {
    // this.color = this.params.value;
  }

  clickMessage(color): void {
    // const colorValue =
    console.log('click');
    this.selectedColor = color;
    console.log("the selectedColor is: " + this.selectedColor);
  }

  canSubmit(): boolean {
    return !!this.selectedColor;
  }

  submit() {
    this.pick(this.selectedColor);
  }


  triggerColorSelect() {
    const event = this.getClickEvent();
    this.navColorInput.nativeElement.dispatchEvent(event);
  }

  colorChanged(color) {
    this.selectedColor = color;
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
