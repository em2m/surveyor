import * as L from "leaflet";
import {LayerDefinition, LayerProvider} from "../../leaflet.model";
import {Injectable} from "@angular/core";
import {AppConfig} from "../../../../core/config/config.service";

@Injectable()
export class MapboxProvider implements LayerProvider {

  config: any;

  constructor(private appConfig: AppConfig) {}

  provide(): Array<LayerDefinition> {
    let mapProvider = this.appConfig.get().map.provider;
    if (mapProvider === 'mapbox') {
      let accessToken = this.appConfig.get().map.mapbox.accessToken;

      let streetsLayer = {
        label: "Streets",
        layer: L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
          maxZoom: 21,
          id: 'elasticm2m.nejp4l71',
          accessToken: accessToken,
          /*
          tileSize: 512,
          zoomOffset: -1
          */
        })
      };

      let satelliteLayer = {
        label: "Satellite",
        layer: L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
          maxZoom: 21,
          maxNativeZoom: 19,
          id: 'elasticm2m.nejpcg33',
          accessToken: accessToken,
          /*
          tileSize: 512,
          zoomOffset: -1
          */
        })
      };
      return [streetsLayer, satelliteLayer];
    } else {
      return [];
    }
  }
}
