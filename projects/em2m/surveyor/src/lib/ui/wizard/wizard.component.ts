import {AfterViewInit, Component, ContentChildren, EventEmitter, Input, Output, QueryList} from '@angular/core';
import {SurveyorWizardStepComponent} from './step.component';

@Component({
  selector: 'surveyor-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class SurveyorWizardComponent implements AfterViewInit {

  @Input() skipInvalid: boolean;
  @Output() complete: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() select: EventEmitter<SurveyorWizardStepComponent> = new EventEmitter<SurveyorWizardStepComponent>();
  @ContentChildren(SurveyorWizardStepComponent) steps: QueryList<SurveyorWizardStepComponent>;
  activeIndex: number;

  constructor() {
  }

  ngAfterViewInit() {
    setTimeout(() => this.selectStep(0));
  }

  selectStep(newIndex: number) {
    if (this.activeIndex !== newIndex) {
      const steps = this.steps.toArray();

      // Make sure all previous steps have been completed before skipping ahead
      for (let i = 0; i < newIndex; i++) {
        if (!this.isComplete(i, true)) {
          return;
        }
      }

      // Slide out the current step if one is active
      if (this.activeIndex !== undefined) {
        const currentStep = steps[this.activeIndex];
        if (this.activeIndex > newIndex) {
          currentStep.hideRight();
        } else {
          currentStep.hideLeft();
        }
      }

      // Slide in the new step
      const newStep = steps[newIndex];
      if (this.activeIndex > newIndex) {
        newStep.showLeft();
      } else {
        newStep.showRight();
      }
      this.activeIndex = newIndex;
      newStep.loaded = true;

      this.select.emit(newStep);
    }
  }

  isComplete(stepIndex: number, honorSkip?: boolean): boolean {
    const step = this.steps.toArray()[stepIndex];
    if (!step) {
      return false;
    }

    // Last step should always check all previous phases and ignore skip invalid
    if (stepIndex === this.steps.length - 1) {
      for (let i = 0; i < stepIndex; i++) {
        if (!this.isComplete(i)) {
          return false;
        }
      }
    }

    return step.optional || step.complete || (this.skipInvalid && honorSkip && stepIndex !== this.steps.length - 1);
  }

  onComplete() {
    this.complete.emit(true);
  }
}
