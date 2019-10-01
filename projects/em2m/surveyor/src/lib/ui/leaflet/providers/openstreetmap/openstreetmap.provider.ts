import * as L from 'leaflet';
import {LayerDefinition, LayerProvider} from '../../leaflet.model';
import {Injectable} from '@angular/core';
import {AppConfig} from '../../../../core/config/config.service';
import {ContextService} from '../../../../core/extension/context.service';

@Injectable()
export class OpenStreetMapProvider extends LayerProvider {

  config: any;

  constructor(private appConfig: AppConfig, private ctx: ContextService) {
    super();
  }

  provide(): Array<LayerDefinition> {
    this.resolveProvider(this.appConfig, this.ctx);

    if (!this.mapProvider || this.mapProvider === 'openstreetmap') {
      const streetsLayer = {
        label: 'Streets',
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
