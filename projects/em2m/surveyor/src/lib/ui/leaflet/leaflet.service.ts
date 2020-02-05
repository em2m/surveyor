import {Injectable, Injector} from '@angular/core';
import {ControlProvider, FeatureProvider, LayerProvider} from './leaflet.model';
import {ExtensionService} from '../../core/extension/extension.service';
import {Map, Control, Layer} from 'leaflet';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class LeafletService {

  private BASE_LAYER_EXTENSION_TYPE = 'surveyor:leaflet-base-layer';
  private OVERLAY_EXTENSION_TYPE = 'surveyor:leaflet-overlay';
  private FEATURE_EXTENSION_TYPE = 'surveyor:leaflet-feature';
  private CONTROL_EXTENSION_TYPE = 'surveyor:leaflet-control';

  private mapSources: { [mapId: string]: BehaviorSubject<Map>; } = {};
  private mapControlLayers: { [mapId: string]: Control.Layers } = {};
  private mapBaseLayers: { [mapId: string]: Array<any> } = {};

  constructor(private injector: Injector, private extensionService: ExtensionService) {}

  findBaseLayers(target: string): Array<LayerProvider> {
    const extensions = [
      ...this.extensionService.getExtensionsForTypeAndTarget(this.BASE_LAYER_EXTENSION_TYPE, 'global'),
      ...this.extensionService.getExtensionsForTypeAndTarget(this.BASE_LAYER_EXTENSION_TYPE, target)
    ];

    return extensions.filter(extension => extension !== null).map(extension => {
      const type = extension.value;

      const layer = this.injector.get(type) as LayerProvider;
      layer.config = extension.config;
      return layer;
    });
  }

  findOverlays(target: string): Array<LayerProvider> {
    const extensions = [
      ...this.extensionService.getExtensionsForTypeAndTarget(this.OVERLAY_EXTENSION_TYPE, 'global'),
      ...this.extensionService.getExtensionsForTypeAndTarget(this.OVERLAY_EXTENSION_TYPE, target)
    ];

    return extensions.filter(extension => extension !== null).map(extension => {
      const type = extension.value;

      const layer = this.injector.get(type) as LayerProvider;
      layer.config = extension.config;
      return layer;
    });
  }

  findFeatures(target: string): Array<FeatureProvider> {
    const extensions = [
      ...this.extensionService.getExtensionsForTypeAndTarget(this.FEATURE_EXTENSION_TYPE, 'global'),
      ...this.extensionService.getExtensionsForTypeAndTarget(this.FEATURE_EXTENSION_TYPE, target)
    ];

    return extensions.filter(extension => extension !== null).map(extension => {
      const type = extension.value;

      const layer = this.injector.get(type) as FeatureProvider;
      layer.config = extension.config;
      return layer;
    });
  }

  findControls(target: string): Array<ControlProvider> {
    const extensions = [
      ...this.extensionService.getExtensionsForTypeAndTarget(this.CONTROL_EXTENSION_TYPE, 'global'),
      ...this.extensionService.getExtensionsForTypeAndTarget(this.CONTROL_EXTENSION_TYPE, target)
    ];

    return extensions.filter(extension => extension !== null).map(extension => {
      const type = extension.value;

      const layer = this.injector.get(type) as ControlProvider;
      layer.config = extension.config;
      return layer;
    });
  }

  setMap(mapId: string, map: Map) {
    this.getMapSource(mapId).next(map);
  }

  getMap(mapId: string): any {
    return this.getMapSource(mapId).getValue();
  }

  watchMap(mapId: string): Observable<Map> {
    return this.getMapSource(mapId).asObservable();
  }

  setLayerControl(mapId: string, controlLayer: Control.Layers) {
    this.mapControlLayers[mapId] = controlLayer;
  }

  getLayerControl(mapId): Control.Layers {
    return this.mapControlLayers[mapId];
  }

  getMapBaseLayers(mapId): Array<{label: string, layer: Layer}> {
    return this.mapBaseLayers[mapId];
  }

  setMapBaseLayers(mapId: string, baseLayers: Array<any>) {
    this.mapBaseLayers[mapId] = baseLayers;
  }

  private getMapSource(mapId: string): BehaviorSubject<Map> {
    let source = this.mapSources[mapId];
    if (!source) {
      source = new BehaviorSubject<Map>(null);
      this.mapSources[mapId] = source;
    }
    source.subscribe((map) => {
      if (map) { map.invalidateSize(); }
    });
    return source;
  }
}
