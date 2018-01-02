import {Map, Layer} from "leaflet";

export interface LayerDefinition {
  label: string;
  layer: Layer;
  enabled?: boolean;
}

export interface LayerProvider {
  config: any;
  provide(map: Map): LayerDefinition | Array<LayerDefinition>;
}

export interface FeatureProvider {
  config: any;
  provide(map: Map);
}
