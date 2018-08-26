import * as L from 'leaflet';
import {LayerDefinition, LayerProvider} from '../../leaflet.model';
import {Injectable} from '@angular/core';
import {AppConfig} from '../../../../core/config/config.service';
import 'leaflet.mapkitmutant';

@Injectable()
export class AppleMapkitProvider implements LayerProvider {

  config: any;

  constructor(private appConfig: AppConfig) {}

  provide(): Array<LayerDefinition> | Array<LayerDefinition> {
    let mapProvider = this.appConfig.get().map.provider;
    if (mapProvider === 'apple') {
      let accessToken = this.appConfig.get().map.apple.token;

      let streetsLayer = <LayerDefinition>{
        label: 'Streets',
        layer: (L as any).mapkitMutant({
          type: 'standard',
          authorizationCallback: (done) => done(accessToken)
        })
      };
      let satelliteLayer = <LayerDefinition>{
        label: 'Satellite',
        layer: (L as any).mapkitMutant({
          type: 'hybrid',
          authorizationCallback: (done) => done(accessToken)
        })
      };

      return [streetsLayer, satelliteLayer];
    } else {
      return [];
    }
  }
}
