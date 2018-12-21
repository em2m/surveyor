import {Component, Input} from '@angular/core';

@Component({
  selector: 'surveyor-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class SurveyorWizardStepComponent {

  animateClass: string;
  @Input() active = false;
  @Input() loaded = false;
  @Input() title: string;
  @Input() optional: boolean;
  @Input() complete: boolean;

  constructor() {
  }

  showLeft() {
    this.animateClass = 'slideInLeft';
    this.active = true;
  }

  showRight() {
    this.animateClass = 'slideInRight';
    this.active = true;
  }

  hideLeft() {
    this.animateClass = 'slideOutLeft';
    setTimeout(() => {
      this.active = false;
    }, 500);
  }

  hideRight() {
    this.animateClass = 'slideOutRight';
    setTimeout(() => {
      this.active = false;
    }, 500);
  }
}
