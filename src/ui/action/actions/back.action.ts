import {Injectable} from "@angular/core";
import {ActionSupport} from "../action.model";
import {Location} from "@angular/common";

@Injectable()
export class NavigateBackAction extends ActionSupport {

  constructor(private location: Location) {
    super();
    this.text = "Back";
    this.iconClass = "fa-chevron-left";
    this.primary = true;
  }

  run() {
    this.location.back();
  }
}
