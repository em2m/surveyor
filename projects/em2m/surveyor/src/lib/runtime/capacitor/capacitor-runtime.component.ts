import {Component, ViewContainerRef} from '@angular/core';
import {Capacitor, Plugins} from '@capacitor/core';
import {PopoverService} from '../../ui/popover/popover.service';
import {ModalService} from '../../ui/modal/modal.service';
const {SplashScreen} = Plugins;

@Component({
  selector: 'surveyor-runtime',
  template: '<div mdl style="height: 100vh; display: flex; flex-direction: column;"><router-outlet></router-outlet></div>'
})
export class SurveyorCapacitorRuntime {

  constructor(private viewContainerRef: ViewContainerRef,
              private modalService: ModalService,
              private popoverService: PopoverService) {
    this.viewContainerRef = viewContainerRef;

    // Configure viewContainerRef target for various dependencies
    this.modalService.setRootViewContainerRef(viewContainerRef);
    this.popoverService.setRootViewContainerRef(viewContainerRef);

    if (Capacitor.isPluginAvailable('SplashScreen')) {
      SplashScreen.hide();
    }
  }
}
