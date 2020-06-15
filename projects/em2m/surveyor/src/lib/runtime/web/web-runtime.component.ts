import {Component, ViewContainerRef} from '@angular/core';
import {ModalService} from '../../ui/modal/modal.service';
import {PopoverService} from '../../ui/popover/popover.service';

@Component({
  selector: 'app-root',
  template: '<div mdl><router-outlet></router-outlet></div>'
})
export class SurveyorWebRuntime {

  constructor(private viewContainerRef: ViewContainerRef,
              private modalService: ModalService,
              private popoverService: PopoverService) {
    this.viewContainerRef = viewContainerRef;

    // Configure viewContainerRef target for various dependencies
    this.modalService.setRootViewContainerRef(viewContainerRef);
    this.popoverService.setRootViewContainerRef(viewContainerRef);

  }
}
