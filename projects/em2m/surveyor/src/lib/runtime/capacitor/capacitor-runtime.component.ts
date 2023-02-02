import {Component, ViewContainerRef} from '@angular/core';
import {PopoverService} from '../../ui/popover/popover.service';
import {ModalService} from '../../ui/modal/modal.service';
import {DeeplinksService} from "./deeplinks/DeeplinksService";

@Component({
  selector: 'surveyor-runtime',
  template: '<div mdl style="height: 100vh; display: flex; flex-direction: column;"><router-outlet></router-outlet></div>'
})
export class SurveyorCapacitorRuntime {

  constructor(private viewContainerRef: ViewContainerRef,
              private modalService: ModalService,
              private popoverService: PopoverService,
              private deepLinksService: DeeplinksService) {
    this.viewContainerRef = viewContainerRef;

    // Configure viewContainerRef target for various dependencies
    this.modalService.setRootViewContainerRef(viewContainerRef);
    this.popoverService.setRootViewContainerRef(viewContainerRef);

    /*
    if (Capacitor.isPluginAvailable('SplashScreen')) {
      SplashScreen.hide();
    }
     */
  }
}
