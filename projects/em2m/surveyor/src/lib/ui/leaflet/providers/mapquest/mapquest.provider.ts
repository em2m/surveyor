import * as L from 'leaflet';
import {LayerDefinition, LayerProvider} from '../../leaflet.model';
import {Injectable} from '@angular/core';
import {AppConfig} from '../../../../core/config/config.service';

@Injectable()
export class MapquestProvider implements LayerProvider {

  config: any;

  constructor(private appConfig: AppConfig) {}

  provide(): Array<LayerDefinition> {
    let mapProvider = this.appConfig.get().map.provider;
    if (mapProvider === 'mapquest') {
      let accessToken = this.appConfig.get().map.mapquest.accessToken;

      let streetsLayer = {
        label: 'Streets',
        layer: L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
          maxZoom: 21,
          id: 'mapquest.streets-mb',
          accessToken: accessToken
        })
      };

      let satelliteLayer = {
        label: 'Satellite',
        layer: L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
          maxZoom: 21,
          maxNativeZoom: 19,
          id: 'mapquest.satellitenolabels',
          accessToken: accessToken
        })
      };

      let hybridLayer = {
        label: 'Hybrid',
        layer: L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}@2x.png?access_token={accessToken}', {
          maxZoom: 21,
          maxNativeZoom: 19,
          id: 'mapquest.satellite',
          accessToken: accessToken
        })
      };
      return [streetsLayer, satelliteLayer, hybridLayer];
    } else {
      return [];
    }
  }
}
