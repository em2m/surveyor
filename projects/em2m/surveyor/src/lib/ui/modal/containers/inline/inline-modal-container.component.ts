import {Component, ComponentFactoryResolver} from "@angular/core";
import {ModalContainer} from "../../modal-container.component";

@Component({
  selector: 'surveyor-inline-modal-container',
  templateUrl: './inline-modal-container.component.html',
  styleUrls: ['./inline-modal-container.component.scss']
})
export class InlineModalContainer extends ModalContainer {

  constructor(resolver: ComponentFactoryResolver) {
    super(resolver);
  }
}

