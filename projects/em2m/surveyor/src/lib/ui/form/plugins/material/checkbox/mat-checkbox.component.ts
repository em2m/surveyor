import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {SurveyorFormInputComponent} from '../../../form-input-component';
import {MaskedValue} from '../../../../mask/mask.model';

@Component({
  selector: 'surveyor-mat-checkbox-input',
  templateUrl: './mat-checkbox.component.html',
  styleUrls: ['./mat-checkbox.component.scss']
})
export class MaterialCheckboxInputComponent extends SurveyorFormInputComponent {
}
