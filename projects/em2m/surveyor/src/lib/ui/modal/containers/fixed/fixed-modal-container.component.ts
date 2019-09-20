import {Component, ComponentFactoryResolver, HostBinding} from '@angular/core';
import {ModalContainer} from '../../modal-container.component';

@Component({
  selector: 'surveyor-fixed-modal-container',
  templateUrl: './fixed-modal-container.component.html',
  styleUrls: ['./fixed-modal-container.component.scss'],
})
export class FixedModalContainer extends ModalContainer {

  //@HostBinding('class') styleClass = 'scrollable-y';

  constructor(resolver: ComponentFactoryResolver) {
    super(resolver);
  }
}

