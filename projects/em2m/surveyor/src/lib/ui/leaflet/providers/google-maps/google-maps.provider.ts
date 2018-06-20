import * as L from 'leaflet';
import {LayerDefinition, LayerProvider} from '../../leaflet.model';
import {Injectable} from '@angular/core';
import {AppConfig} from '../../../../core/config/config.service';
import {GoogleMapsLoaderService} from './google-maps-loader.service';
import {Observable} from 'rxjs/Observable';
import {Layer} from 'leaflet';

@Injectable()
export class GoogleMapsProvider implements LayerProvider {

  config: any;

  constructor(private appConfig: AppConfig, private googleMaps: GoogleMapsLoaderService) {

  }

  provide(): Array<LayerDefinition> | Observable<Array<LayerDefinition>> {

    let mapProvider = this.appConfig.get().map.provider;
    if (mapProvider === 'google') {
      //let accessToken = this.appConfig.get().map.google.apiKey;

      return this.googleMaps.loadApi('AIzaSyAL7AtF6jYTzN4mObd57kZ7XEhb-bbmEpY')
        .map(() => {
          let gridLayer = L.gridLayer as any;
          let streetsLayer = <LayerDefinition>{
            label: 'Streets',
            layer: gridLayer.googleMutant({ type: 'roadmap' })
          };
          let satelliteLayer = <LayerDefinition>{
            label: 'Satellite',
            layer: gridLayer.googleMutant({type: 'hybrid'})
          };

          console.log('Google Layers Ready');
          return [streetsLayer, satelliteLayer];
        });
    } else {
      return [];
    }
  }
}
