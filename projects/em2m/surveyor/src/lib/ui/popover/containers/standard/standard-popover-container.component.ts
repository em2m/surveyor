import {ChangeDetectorRef, Component, ComponentFactoryResolver, HostBinding} from '@angular/core';
import {PopoverContainer} from '../../popover-container.component';

@Component({
  selector: 'standard-popover-container',
  templateUrl: './standard-popover-container.component.html',
  styleUrls: ['./standard-popover-container.component.scss']
})
export class StandardPopoverContainer extends PopoverContainer {

  //@HostBinding('class') styleClass = 'scrollable-y';

  constructor(resolver: ComponentFactoryResolver, changeDetectorRef: ChangeDetectorRef) {
    super(resolver, changeDetectorRef);
  }
}

