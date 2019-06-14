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
  @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ContentChildren(SurveyorWizardStepComponent) steps: QueryList<SurveyorWizardStepComponent>;
  activeIndex: number;

  constructor() {
  }

  ngAfterViewInit() {
    setTimeout(() => this.selectStep(0));
  }

  selectStep(newIndex: number, ignoreSkipped = false) {
    if (this.activeIndex !== newIndex) {
      const steps = this.steps.toArray();
      if (ignoreSkipped && steps[newIndex].skipped) {
        return;
      }

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

      // Slide in the new step, skipping any steps with the 'skipped' flag
      let nextIndex = newIndex;
      while (steps[nextIndex].skipped) {
        nextIndex += 1
      }
      const newStep = steps[nextIndex];
      if (this.activeIndex > nextIndex) {
        newStep.showLeft();
      } else {
        newStep.showRight();
      }
      this.activeIndex = nextIndex;
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

    return step.optional || step.skipped || step.complete || (this.skipInvalid && honorSkip && stepIndex !== this.steps.length - 1);
  }

  isSkipped(stepIndex: number): boolean {
    const step = this.steps.toArray()[stepIndex];
    if (!step) {
      return false;
    }

    return step.skipped;
  }

  isActive(stepIndex: number): boolean {
    return stepIndex === this.activeIndex;
  }

  onComplete() {
    this.complete.emit(true);
  }

  onCancel() {
    this.cancel.emit(true);
  }
}
