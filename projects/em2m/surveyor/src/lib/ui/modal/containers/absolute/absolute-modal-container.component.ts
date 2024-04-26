import {Component, ComponentFactoryResolver, HostBinding} from '@angular/core';
import {ModalContainer} from '../../modal-container.component';

@Component({
  selector: 'surveyor-absolute-modal-container',
  templateUrl: './absolute-modal-container.component.html',
  styleUrls: ['./absolute-modal-container.component.scss'],
})
export class AbsoluteModalContainer extends ModalContainer {

  //@HostBinding('class') styleClass = 'scrollable-y';

  constructor(resolver: ComponentFactoryResolver) {
    super(resolver);
  }
}

