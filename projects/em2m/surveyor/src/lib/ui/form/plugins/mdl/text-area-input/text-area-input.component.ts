import {AfterViewInit, Component} from "@angular/core";
import {SurveyorFormInputComponent} from "../../../form-input-component";

@Component({
  selector: 'surveyor-textarea-input',
  templateUrl: './text-area-input.component.html',
  styleUrls: ['./text-area-input.component.scss']
})
export class MdlTextAreaInputComponent extends SurveyorFormInputComponent implements AfterViewInit {
  ngAfterViewInit() {
    // Hack required to get MDL to bind event handlers after a view change
    window.dispatchEvent(new Event("load"));
  }
}
