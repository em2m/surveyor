import {Component, ComponentFactoryResolver, HostBinding} from '@angular/core';
import {ModalContainer} from '../../modal-container.component';
import {Surveyori18nService} from "../../../i18n/shared/i18n.service";

@Component({
  selector: 'surveyor-fixed-modal-container',
  templateUrl: './fixed-modal-container.component.html',
  styleUrls: ['./fixed-modal-container.component.scss'],
})
export class FixedModalContainer extends ModalContainer {

  //@HostBinding('class') styleClass = 'scrollable-y';

  constructor(resolver: ComponentFactoryResolver, i18nService: Surveyori18nService) {
    super(resolver, i18nService);
  }
}

