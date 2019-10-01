import * as L from 'leaflet';
import {LayerDefinition, LayerProvider} from '../../leaflet.model';
import {Injectable} from '@angular/core';
import {AppConfig} from '../../../../core/config/config.service';
import {ContextService} from '../../../../core/extension/context.service';

@Injectable()
export class MapboxProvider extends LayerProvider {

  config: any;

  constructor(private appConfig: AppConfig, private ctx: ContextService) {
    super();
  }

  provide(): Array<LayerDefinition> {
    this.resolveProvider(this.appConfig, this.ctx);

    if (this.mapProvider === 'mapbox') {
      const accessToken = this.mapConfig.mapboxKey || this.mapConfig.accessToken;

      const streetsLayer = {
        label: 'Streets',
        layer: L.tileLayer('https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
          maxZoom: 21,
          id: 'mapbox.streets',
          accessToken: accessToken,
          /*
          tileSize: 512,
          zoomOffset: -1
          */
        })
      };

      const satelliteLayer = {
        label: 'Satellite',
        layer: L.tileLayer('https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
          maxZoom: 21,
          maxNativeZoom: 19,
          id: 'mapbox.streets-satellite',
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
