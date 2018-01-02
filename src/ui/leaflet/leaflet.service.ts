import {Injectable, Injector} from "@angular/core";
import {FeatureProvider, LayerProvider} from "./leaflet.model";
import {ExtensionService} from "../../core/extension/extension.service";
import {FilterContext} from "../../core/extension/extension.model";
import {Map} from "leaflet";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class LeafletService {

  private BASE_LAYER_EXTENSION_TYPE = "surveyor:leaflet-base-layer";
  private OVERLAY_EXTENSION_TYPE = "surveyor:leaflet-overlay";
  private FEATURE_EXTENSION_TYPE = "surveyor:leaflet-feature";

  private mapSources: { [mapId: string]: BehaviorSubject<Map>; } = {};

  constructor(private injector: Injector, private extensionService: ExtensionService) {}

  findBaseLayers(target: string): Array<LayerProvider> {
    let extensions = [
      ...this.extensionService.getExtensionsForTypeAndTarget(this.BASE_LAYER_EXTENSION_TYPE, "global"),
      ...this.extensionService.getExtensionsForTypeAndTarget(this.BASE_LAYER_EXTENSION_TYPE, target)
    ];

    return extensions.filter(extension => extension !== null).map(extension => {
      let type = extension.value;

      let layer = this.injector.get(type) as LayerProvider;
      layer.config = extension.config;
      return layer;
    });
  }

  findOverlays(target: string): Array<LayerProvider> {
    let extensions = [
      ...this.extensionService.getExtensionsForTypeAndTarget(this.OVERLAY_EXTENSION_TYPE, "global"),
      ...this.extensionService.getExtensionsForTypeAndTarget(this.OVERLAY_EXTENSION_TYPE, target)
    ];

    return extensions.filter(extension => extension !== null).map(extension => {
      let type = extension.value;

      let layer = this.injector.get(type) as LayerProvider;
      layer.config = extension.config;
      return layer;
    });
  }

  findFeatures(target: string): Array<FeatureProvider> {
    let extensions = [
      ...this.extensionService.getExtensionsForTypeAndTarget(this.FEATURE_EXTENSION_TYPE, "global"),
      ...this.extensionService.getExtensionsForTypeAndTarget(this.FEATURE_EXTENSION_TYPE, target)
    ];

    return extensions.filter(extension => extension !== null).map(extension => {
      let type = extension.value;

      let layer = this.injector.get(type) as FeatureProvider;
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

  private getMapSource(mapId: string): BehaviorSubject<Map> {
    let source = this.mapSources[mapId];
    if (!source) {
      source = new BehaviorSubject<Map>(null);
      this.mapSources[mapId] = source;
    }
    return source;
  }
}
