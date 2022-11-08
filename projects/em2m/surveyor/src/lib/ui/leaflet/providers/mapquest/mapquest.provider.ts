import * as L from 'leaflet';
import {LayerDefinition, LayerProvider} from '../../leaflet.model';
import {Injectable} from '@angular/core';
import {AppConfig} from '../../../../core/config/config.service';
import {ContextService} from '../../../../core/extension/context.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MapScriptLoaderService} from '../../map-script-loader.service';

declare let MQ: any;

@Injectable()
export class MapquestProvider extends LayerProvider {

  config: any;

  constructor(private appConfig: AppConfig, private ctx: ContextService, private scriptLoader: MapScriptLoaderService) {
    super();
  }

  provide(): Array<LayerDefinition> | Observable<Array<LayerDefinition>> {
    this.resolveProvider(this.appConfig, this.ctx);
    const accessToken = this.mapConfig.accessToken || this.mapConfig.mapquestKey;

    if (this.mapProvider === 'mapquest') {
      const scriptUrl = `https://www.mapquestapi.com/sdk/leaflet/v2.2/mq-map.js?key=${accessToken}`;
      return this.scriptLoader.loadApi(scriptUrl).pipe(
        map(() => {

          const streetsLayer = {
            label: 'Streets',
            layer: MQ.mapLayer()
          };

          const satelliteLayer = {
            label: 'Satellite',
            layer: MQ.satelliteLayer()
          };

          return [streetsLayer, satelliteLayer];
        }));
    } else {
      return [];
    }
  }
}
