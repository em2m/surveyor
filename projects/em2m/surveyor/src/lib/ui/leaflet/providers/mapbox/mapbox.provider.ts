import * as L from 'leaflet';
import {LayerDefinition, LayerProvider} from '../../leaflet.model';
import {Injectable} from '@angular/core';
import {AppConfig} from '../../../../core/config/config.service';
import {ContextService} from '../../../../core/extension/context.service';
import {Surveyori18nService} from "../../../i18n/shared/i18n.service";

@Injectable()
export class MapboxProvider extends LayerProvider {

  config: any;

  constructor(private appConfig: AppConfig, private ctx: ContextService, private i18nService: Surveyori18nService) {
    super();
  }

  provide(): Array<LayerDefinition> {
    this.resolveProvider(this.appConfig, this.ctx);

    if (this.mapProvider === 'mapbox') {
      const accessToken = this.mapConfig.mapboxKey || this.mapConfig.accessToken;
      const streetLayerId = this.mapConfig.mapboxStreetLayerId || 'mapbox/streets-v11';
      const satelliteLayerId = this.mapConfig.mapboxSatelliteLayerId || 'mapbox/satellite-streets-v11';

      const streetsLayer = {
        label: this.i18nService.translate('Streets'),
        enLabel: 'Streets',
        layer: L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
          maxZoom: 21,
          id: streetLayerId,
          accessToken: accessToken,
          tileSize: 512,
          zoomOffset: -1
        })
      };

      const satelliteLayer = {
        label: this.i18nService.translate('Satellite'),
        enLabel: 'Satellite',
        layer: L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
          maxZoom: 21,
          maxNativeZoom: 19,
          id: satelliteLayerId,
          accessToken: accessToken,
          tileSize: 512,
          zoomOffset: -1
        })
      };
      return [streetsLayer, satelliteLayer];
    } else {
      return [];
    }
  }
}
