import {Component, ComponentFactoryResolver} from "@angular/core";
import {ModalContainer} from "../../modal-container.component";
import {Surveyori18nService} from "../../../i18n/shared/i18n.service";

@Component({
  selector: 'surveyor-side-modal-container',
  templateUrl: './side-modal-container.component.html',
  styleUrls: ['./side-modal-container.component.scss']
})
export class SideModalContainer extends ModalContainer {

  constructor(resolver: ComponentFactoryResolver, i18nService: Surveyori18nService) {
    super(resolver, i18nService);
  }
}

