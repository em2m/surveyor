import * as L from 'leaflet';
import {LayerDefinition, LayerProvider} from '../../leaflet.model';
import {Injectable} from '@angular/core';
import {AppConfig} from '../../../../core/config/config.service';
import {ContextService} from '../../../../core/extension/context.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MapScriptLoaderService} from '../../map-script-loader.service';
import {Surveyori18nService} from "../../../i18n/shared/i18n.service";

@Injectable()
export class MapquestProvider extends LayerProvider {

  config: any;

  constructor(private appConfig: AppConfig, private ctx: ContextService, private scriptLoader: MapScriptLoaderService, private i18nService: Surveyori18nService) {
    super();
  }

  provide(): Array<LayerDefinition> | Observable<Array<LayerDefinition>> {
    this.resolveProvider(this.appConfig, this.ctx);
    const accessToken = this.mapConfig.accessToken || this.mapConfig.mapquestKey;

    if (this.mapProvider === 'mapquest') {
      const scriptUrl = `https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest-core.js`;
      return this.scriptLoader.loadApi(scriptUrl).pipe(
        map(() => {
          (L as any).mapquest.key = accessToken;
          const streetsLayer = {
            label: this.i18nService.translate('Streets'),
            enLabel: 'Streets',
            layer: (L as any).mapquest.tileLayer('map'),
          };

          const satelliteLayer = {
            label: this.i18nService.translate('Satellite'),
            enLabel: 'Satellite',
            layer: (L as any).mapquest.tileLayer('satellite'),
          };

          return [streetsLayer, satelliteLayer];
        }));
    } else {
      return [];
    }
  }
}
