import {Component} from "@angular/core";
import {MdlTextInputComponent} from "../text-input/text-input.component";


@Component({
  selector: 'surveyor-password-input',
  templateUrl: 'password-input.component.html',
  styleUrls: ['../text-input/text-input.component.scss']
})
export class MdlPasswordInputComponent extends MdlTextInputComponent {

  constructor() {
    super();
  }
}
