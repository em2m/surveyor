import * as L from 'leaflet';
import {LayerDefinition, LayerProvider} from '../../leaflet.model';
import {Injectable} from '@angular/core';
import {AppConfig} from '../../../../core/config/config.service';
import 'apple-mapkit-js';
import 'leaflet.mapkitmutant';
import {ContextService} from '../../../../core/extension/context.service';

@Injectable()
export class AppleMapkitProvider extends LayerProvider {

  config: any;

  constructor(private appConfig: AppConfig, private ctx: ContextService) {
    super();
  }

  provide(): Array<LayerDefinition> | Array<LayerDefinition> {
    this.resolveProvider(this.appConfig, this.ctx);

    if (this.mapProvider === 'apple') {
      const accessToken = this.mapConfig.appleKey || this.mapConfig.token;

      const streetsLayer = <LayerDefinition>{
        label: 'Streets',
        layer: (L as any).mapkitMutant({
          type: 'standard',
          minZoom: 3,
          authorizationCallback: (done) => done(accessToken)
        })
      };
      /*
      const hybridLayer = <LayerDefinition>{
        label: 'Hybrid',
        layer: (L as any).mapkitMutant({
          type: 'hybrid',
          minZoom: 3,
          authorizationCallback: (done) => done(accessToken)
        })
      };
      */
      const satelliteLayer = <LayerDefinition>{
        label: 'Satellite',
        layer: (L as any).mapkitMutant({
          type: 'hybrid',
          minZoom: 3,
          authorizationCallback: (done) => done(accessToken)
        })
      };

      return [satelliteLayer, streetsLayer];
    } else {
      return [];
    }
  }
}
