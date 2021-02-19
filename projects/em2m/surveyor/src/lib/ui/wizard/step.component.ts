import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'surveyor-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class SurveyorWizardStepComponent {

  animateClass: string;
  @Input() onStepCompleted: Observable<boolean> = null;
  @Input() active = false;
  @Input() loaded = false;
  @Input() skipped = false;
  @Input() title: string;
  @Input() optional: boolean;
  _complete: boolean;
  @Input() set complete(changes: any) {
    if (typeof changes?.subscribe === 'function') {
      changes.subscribe((complete) => {
        this._complete = complete;
      });
    } else {
      this._complete = !!changes;
    }
  }

  get complete() {
    return this._complete;
  }

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
