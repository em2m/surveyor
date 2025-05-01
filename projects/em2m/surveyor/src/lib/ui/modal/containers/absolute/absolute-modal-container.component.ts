import {Component, ComponentFactoryResolver, HostBinding} from '@angular/core';
import {ModalContainer} from '../../modal-container.component';
import {Surveyori18nService} from "../../../i18n/shared/i18n.service";

@Component({
  selector: 'surveyor-absolute-modal-container',
  templateUrl: './absolute-modal-container.component.html',
  styleUrls: ['./absolute-modal-container.component.scss'],
})
export class AbsoluteModalContainer extends ModalContainer {

  //@HostBinding('class') styleClass = 'scrollable-y';

  constructor(resolver: ComponentFactoryResolver, i18nService: Surveyori18nService) {
    super(resolver, i18nService);
  }
}

