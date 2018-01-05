import {AfterViewInit, Component, ElementRef, Renderer2, Input, Output, EventEmitter} from "@angular/core";
import * as L from 'leaflet';
import {Control, Map, MapOptions} from "leaflet";
import {FeatureProvider, LayerDefinition, LayerProvider} from "./leaflet.model";
import {LeafletService} from "./leaflet.service";
import LayersObject = Control.LayersObject;

@Component({
  selector: 'surveyor-leaflet',
  template: '<div [id]="mapId" style="height: 100%; width: 100%;"></div>'
})
export class SurveyorLeafletComponent implements AfterViewInit {

  @Input() mapId: string;
  @Input() options?: MapOptions;
  @Input() baseLayers?: Array<LayerDefinition> = [];
  @Input() overlays?: Array<LayerDefinition> = [];
  @Output() mapReady = new EventEmitter();
  private map: Map;

  constructor(private leafletService: LeafletService,
              private elementRef: ElementRef,
              private renderer: Renderer2) {}

  ngAfterViewInit() {
    // Initialize the primary map object
    if (!this.options) {
      this.options = <MapOptions>{
        center: [37.8, -96],
        zoom: 4
      };
    }

    this.map =  L.map(this.mapId, this.options);

    let baseLayers = <LayersObject>{};
    let first = true;

    this.leafletService.findBaseLayers(this.mapId)
      .forEach((provider: LayerProvider) => {
        let layerDefs = provider.provide(this.map);
        if (!(layerDefs instanceof Array)) {
          layerDefs = [layerDefs];
        }
        layerDefs.forEach((layerDef: LayerDefinition) => {
          baseLayers[layerDef.label] = layerDef.layer;
          if (first) {
            layerDef.layer.addTo(this.map);
            first = false;
          }
        });
      });

    let overlays = <LayersObject>{};

    this.leafletService.findOverlays(this.mapId)
      .forEach((provider: LayerProvider) => {
        let layerDefs = provider.provide(this.map);
        if (!(layerDefs instanceof Array)) {
          layerDefs = [layerDefs];
        }
        layerDefs.forEach((layerDef: LayerDefinition) => {
          overlays[layerDef.label] = layerDef.layer;
          if ((provider.config && provider.config.enabled && layerDef.enabled !==   false) || layerDef.enabled) {
            layerDef.layer.addTo(this.map);
          }
        });
      });

    this.leafletService.findFeatures(this.mapId)
      .forEach((provider: FeatureProvider) => {
        provider.provide(this.map);
      });

    L.control.layers(baseLayers, overlays, {}).addTo(this.map);

    setTimeout(() => {
      this.map.invalidateSize({});
    });

    let leafletContainerDiv = this.elementRef.nativeElement.querySelector(".leaflet-container");
    this.renderer.removeClass(leafletContainerDiv, 'leaflet-touch');

    this.mapReady.emit(this.map);
  }
}
