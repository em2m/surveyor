import {Component, ComponentFactoryResolver} from "@angular/core";
import {ModalContainer} from "../../modal-container.component";

@Component({
  selector: 'surveyor-side-modal-container',
  templateUrl: './side-modal-container.component.html',
  styleUrls: ['./side-modal-container.component.scss']
})
export class SideModalContainer extends ModalContainer {

  constructor(resolver: ComponentFactoryResolver) {
    super(resolver);
  }
}

