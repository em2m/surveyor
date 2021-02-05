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
      const streetLayerId = this.mapConfig.mapquestStreetLayerId || 'mapquest/ck62awhdx0g1g1iqqv9u80q6i';
      const satelliteLayerId = this.mapConfig.mapquestSatelliteLayerId || 'mapquest/ck62b7u670gx81irs634q9hzs';
      //const hybridLayerId = this.mapConfig.mapquestHybridLayerId || 'mapquest/ck62b7u670gx81irs634q9hzs';

      const streetsLayer = {
        label: 'Streets',
        layer: L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}@2x?access_token={accessToken}', {
          maxZoom: 21,
          id: streetLayerId,
          accessToken: accessToken
        })
      };

      const satelliteLayer = {
        label: 'Satellite',
        layer: L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}@2x?access_token={accessToken}', {
          maxZoom: 21,
          maxNativeZoom: 19,
          id: satelliteLayerId,
          accessToken: accessToken
        })
      };

      // const hybridLayer = {
      //   label: 'Hybrid',
      //   layer: L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      //     maxZoom: 21,
      //     maxNativeZoom: 19,
      //     id: hybridLayerId,
      //     accessToken: accessToken
      //   })
      //};
      return [streetsLayer, satelliteLayer]//, hybridLayer];
    } else {
      return [];
    }
  }
}
