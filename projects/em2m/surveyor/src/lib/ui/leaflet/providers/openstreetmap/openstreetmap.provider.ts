import * as L from "leaflet";
import {LayerDefinition, LayerProvider} from "../../leaflet.model";
import {Injectable} from "@angular/core";
import {AppConfig} from "../../../../core/config/config.service";

@Injectable()
export class OpenStreetMapProvider implements LayerProvider {

  config: any;

  constructor(private appConfig: AppConfig) {}

  provide(): Array<LayerDefinition> {
    let mapProvider = this.appConfig.get().map.provider;
    if (!mapProvider || mapProvider === 'openstreetmap') {
      let streetsLayer = {
        label: "Streets",
        layer: L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          maxZoom: 21
        })
      };
      return [streetsLayer];
    } else {
      return [];
    }
  }
}
