import * as L from "leaflet";
import {ControlProvider, LayerDefinition, LayerProvider} from "../../leaflet.model";
import {Injectable} from "@angular/core";
import {AppConfig} from "../../../../core/config/config.service";
import {Control} from "leaflet";

@Injectable()
export class ZoomControlProvider implements ControlProvider {

  config: any;

  constructor(private appConfig: AppConfig) {}

  provide(): Control {
    return L.control.zoom({position: "topleft"});
  }
}
