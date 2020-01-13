
import {map} from 'rxjs/operators';
import * as L from 'leaflet';
import {LayerDefinition, LayerProvider} from '../../leaflet.model';
import {Injectable} from '@angular/core';
import {AppConfig} from '../../../../core/config/config.service';
import {GoogleMapsLoaderService} from './google-maps-loader.service';
import {Observable} from 'rxjs';
import {ContextService} from '../../../../core/extension/context.service';

@Injectable()
export class GoogleMapsProvider extends LayerProvider {

  config: any;

  constructor(private appConfig: AppConfig, private ctx: ContextService, private googleMaps: GoogleMapsLoaderService) {
    super();
  }

  provide(): Array<LayerDefinition> | Observable<Array<LayerDefinition>> {
    this.resolveProvider(this.appConfig, this.ctx);

    if (this.mapProvider === 'google') {
      const accessToken = this.mapConfig.googleKey || this.mapConfig.apiKey;

      return this.googleMaps.loadApi(accessToken).pipe(
        map(() => {
          const gridLayer = L.gridLayer as any;
          const streetsLayer = <LayerDefinition>{
            label: 'Streets',
            layer: gridLayer.googleMutant({ type: 'roadmap' })
          };
          const satelliteLayer = <LayerDefinition>{
            label: 'Satellite',
            layer: gridLayer.googleMutant({type: 'hybrid'})
          };

          return [streetsLayer, satelliteLayer];
        }));
    } else {
      return [];
    }
  }
}
