
import {map} from 'rxjs/operators';
import * as L from 'leaflet';
import {LayerDefinition, LayerProvider} from '../../leaflet.model';
import {Injectable} from '@angular/core';
import {AppConfig} from '../../../../core/config/config.service';
import {GoogleMapsLoaderService} from './google-maps-loader.service';
import {Observable} from 'rxjs';
import {ContextService} from '../../../../core/extension/context.service';
import {Surveyori18nService} from "../../../i18n/shared/i18n.service";

@Injectable()
export class GoogleMapsProvider extends LayerProvider {

  config: any;

  constructor(private appConfig: AppConfig, private ctx: ContextService, private googleMaps: GoogleMapsLoaderService, private i18nService: Surveyori18nService) {
    super();
  }

  provide(): Array<LayerDefinition> | Observable<Array<LayerDefinition>> {
    this.resolveProvider(this.appConfig, this.ctx);

    if (this.mapProvider === 'google') {
      const accessToken = this.mapConfig.googleKey || this.mapConfig.apiKey;

      return this.googleMaps.loadApi(accessToken).pipe(
        map(() => {
          const gridLayer = L.gridLayer as any;
          if (gridLayer.googleMutant) {
            const streetsLayer = <LayerDefinition>{
              label: this.i18nService.translate('Streets'),
              enLabel: 'Streets',
              layer: gridLayer.googleMutant({type: 'roadmap'})
            };
            const satelliteLayer = <LayerDefinition>{
              label: this.i18nService.translate('Satellite'),
              enLabel: 'Satellite',
              layer: gridLayer.googleMutant({type: 'hybrid'})
            };

            const traffic = gridLayer.googleMutant({
                  type: 'roadmap'
                });
            traffic.addGoogleLayer('TrafficLayer');

            const trafficLayer = <LayerDefinition>{
                label: this.i18nService.translate('Traffic'),
                enLabel: 'Traffic',
                layer: traffic
              };

            return [streetsLayer, satelliteLayer, trafficLayer];
          } else {
            return [];
          }
        }));
    } else {
      return [];
    }
  }
}
