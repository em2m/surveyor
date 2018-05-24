import {Component, ComponentFactoryResolver} from "@angular/core";
import {ModalContainer} from "../../modal-container.component";

@Component({
  selector: 'surveyor-center-modal-container',
  templateUrl: './center-modal-container.component.html',
  styleUrls: ['./center-modal-container.component.scss']
})
export class CenterModalContainer extends ModalContainer {

  constructor(resolver: ComponentFactoryResolver) {
    super(resolver);
  }
}

