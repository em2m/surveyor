import * as L from 'leaflet';
import {LayerDefinition, LayerProvider} from '../../leaflet.model';
import {Injectable} from '@angular/core';
import {AppConfig} from '../../../../core/config/config.service';
import 'apple-mapkit-js';
import 'leaflet.mapkitmutant';

@Injectable()
export class AppleMapkitProvider implements LayerProvider {

  config: any;

  constructor(private appConfig: AppConfig) {}

  provide(): Array<LayerDefinition> | Array<LayerDefinition> {
    const mapProvider = this.appConfig.get().map.provider;
    if (mapProvider === 'apple') {
      const accessToken = this.appConfig.get().map.apple.token;

      const streetsLayer = <LayerDefinition>{
        label: 'Standard',
        layer: (L as any).mapkitMutant({
          maptype: 'default',
          minZoom: 3,
          authorizationCallback: (done) => done(accessToken)
        })
      };
      const hybridLayer = <LayerDefinition>{
        label: 'Hybrid',
        layer: (L as any).mapkitMutant({
          maptype: 'Hybrid',
          minZoom: 3,
          authorizationCallback: (done) => done(accessToken)
        })
      };
      const satelliteLayer = <LayerDefinition>{
        label: 'Satellite',
        layer: (L as any).mapkitMutant({
          maptype: 'Satellite',
          minZoom: 3,
          authorizationCallback: (done) => done(accessToken)
        })
      };

      return [streetsLayer, hybridLayer, satelliteLayer];
    } else {
      return [];
    }
  }
}
