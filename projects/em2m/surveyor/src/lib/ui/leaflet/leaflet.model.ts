import {Map, Layer, Control} from 'leaflet';
import {Observable} from 'rxjs';
import {ContextService} from '../../core/extension/context.service';
import {AppConfig} from '../../core/config/config.service';

export interface LayerDefinition {
  label: string;
  layer: Layer;
  enLabel: string;
  type?: 'overlay' | 'baseLayer';
  enabled?: boolean;
}

export abstract class LayerProvider {
  config: any;
  mapProvider: string;
  mapConfig: any;
  mapStyle = 'street';

  abstract provide(map: Map): Array<LayerDefinition> | Observable<Array<LayerDefinition>>;

  protected resolveProvider(appConfig: AppConfig, ctx: ContextService) {
    const config = appConfig.get();
    const isMobile = !!config.mobile;


    this.mapProvider = config.map.provider;
    if (this.mapProvider) {
      this.mapConfig = config.map[this.mapProvider];
    }

    const brand = ctx.getValue('brand:loaded');
    if (brand) {
      const brandMapSettings = brand.settings.maps;
      if (isMobile && brandMapSettings?.mobileProvider) {
        this.mapProvider = brandMapSettings.mobileProvider;
        this.mapConfig = brandMapSettings;
        if (brandMapSettings.mobileStyle) {
          this.mapStyle = brandMapSettings.mobileStyle;
        }
      } else if (brandMapSettings) {
        if (brandMapSettings.provider) {
          this.mapProvider = brandMapSettings.provider;
          this.mapConfig = brandMapSettings;
        }
        if (brandMapSettings.style) {
          this.mapStyle = brandMapSettings.style;
        }
      }
    }

    const orgMapSettings = ctx.getValue('organization:map:settings');
    if (orgMapSettings && !isMobile) {
      if (orgMapSettings.provider) {
        this.mapProvider = orgMapSettings.provider;
        this.mapConfig = orgMapSettings;
      }
      if (orgMapSettings.style) {
        this.mapStyle = orgMapSettings.style;
      }
    }
  }
}

export interface FeatureProvider {
  config: any;
  provide(map: Map);
}

export interface ControlProvider {
  config: any;
  provide(map: Map): Control;
}
