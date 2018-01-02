import {Component, ViewContainerRef} from "@angular/core";
import {ModalService} from "../ui/modal/modal.service";

@Component({
  selector: 'app-root',
  template: '<div mdl><router-outlet></router-outlet></div>'
})
export class SurveyorRuntimeComponent {

  constructor(private viewContainerRef: ViewContainerRef, private modalService: ModalService) {
    this.viewContainerRef = viewContainerRef;

    // Configure viewContainerRef target for various dependencies
    this.modalService.setRootViewContainerRef(viewContainerRef);
  }
}
