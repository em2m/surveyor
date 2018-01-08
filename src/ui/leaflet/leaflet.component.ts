import {AfterViewInit, Component, ElementRef, Renderer2, Input, Output, EventEmitter} from "@angular/core";
import * as L from 'leaflet';
import {Control, Map, MapOptions} from "leaflet";
import {ControlProvider, FeatureProvider, LayerDefinition, LayerProvider} from "./leaflet.model";
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
        zoom: 4,
        zoomControl: false
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

    this.leafletService.findControls(this.mapId)
      .forEach((provider: ControlProvider) => {
        let control = provider.provide(this.map);

        if (control)
          control.addTo(this.map)
        else
          console.error("Could not provide control for " + provider.config)
    })

    L.control.layers(baseLayers, overlays, {}).addTo(this.map);

    setTimeout(() => {
      let leafletContainerDiv = this.elementRef.nativeElement.querySelector(".leaflet-container");
      this.renderer.removeClass(leafletContainerDiv, 'leaflet-touch');
      this.map.invalidateSize({});
    });


    this.mapReady.emit(this.map);
  }
}
