import * as L from 'leaflet';
import {LayerDefinition, LayerProvider} from '../../leaflet.model';
import {Injectable} from '@angular/core';
import {AppConfig} from '../../../../core/config/config.service';
import {ContextService} from '../../../../core/extension/context.service';

@Injectable()
export class MapquestProvider extends LayerProvider {

  config: any;

  constructor(private appConfig: AppConfig, private ctx: ContextService) {
    super();
  }

  provide(): Array<LayerDefinition> {
    this.resolveProvider(this.appConfig, this.ctx);

    if (this.mapProvider === 'mapquest') {
      const accessToken = this.mapConfig.accessToken || this.mapConfig.mapquestKey;
      const streetLayerId = this.mapConfig.mapquestStreetLayerId || 'mapquest.streets-mb';
      const satelliteLayerId = this.mapConfig.mapquestSatelliteLayerId || 'mapquest.satellitenolabels';
      const hybridLayerId = this.mapConfig.mapquestHybridLayerId || 'mapquest.satellite';

      const streetsLayer = {
        label: 'Streets',
        layer: L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
          maxZoom: 21,
          id: streetLayerId,
          accessToken: accessToken
        })
      };

      const satelliteLayer = {
        label: 'Satellite',
        layer: L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
          maxZoom: 21,
          maxNativeZoom: 19,
          id: satelliteLayerId,
          accessToken: accessToken
        })
      };

      const hybridLayer = {
        label: 'Hybrid',
        layer: L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}@2x.png?access_token={accessToken}', {
          maxZoom: 21,
          maxNativeZoom: 19,
          id: hybridLayerId,
          accessToken: accessToken
        })
      };
      return [streetsLayer, satelliteLayer, hybridLayer];
    } else {
      return [];
    }
  }
}
