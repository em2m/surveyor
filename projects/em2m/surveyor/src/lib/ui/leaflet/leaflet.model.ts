import {Map, Layer, Control} from 'leaflet';
import {Observable} from 'rxjs/Observable';

export interface LayerDefinition {
  label: string;
  layer: Layer;
  type?: 'overlay' | 'baseLayer';
  enabled?: boolean;
}

export interface LayerProvider {
  config: any;
  provide(map: Map): Array<LayerDefinition> | Observable<Array<LayerDefinition>>;
  //provide(map: Map): LayerDefinition | Array<LayerDefinition>;
}

export interface FeatureProvider {
  config: any;
  provide(map: Map);
}

export interface ControlProvider {
  config: any;
  provide(map: Map): Control;
}
