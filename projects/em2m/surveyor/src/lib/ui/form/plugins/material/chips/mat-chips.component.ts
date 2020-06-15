import {Component, OnInit} from '@angular/core';
import {SurveyorFormInputComponent} from '../../../form-input-component';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
    selector: 'surveyor-mat-chip-input',
    templateUrl: './mat-chips.component.html',
    styleUrls: ['./mat-chips.component.scss']
})
export class MaterialChipsInputComponent extends SurveyorFormInputComponent implements OnInit {
    public tags: Array<string> = [];
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];

    ngOnInit() {
        setTimeout(() => {
            this.tags = this.formControl.value || [];
        }, 100)
    }

    addTag(event: MatChipInputEvent): void {
      const input = event.input;
      const value = event.value;

      if ((value || '').trim()) {
        if (this.tags.indexOf(value.trim()) == -1) {
          this.tags.push(value.trim());
        }
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.setValue(this.tags)
    }

    removeTag(tag: any) {
      const index = this.tags.indexOf(tag);

      if (index >= 0) {
        this.tags.splice(index, 1);
      }

      this.setValue(this.tags);
    }
}
