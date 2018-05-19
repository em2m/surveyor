import {AfterViewInit, Component, ElementRef, Renderer2, Input, Output, EventEmitter} from "@angular/core";
import * as L from 'leaflet';
import {Control, Map, MapOptions} from "leaflet";
import {ControlProvider, FeatureProvider, LayerDefinition, LayerProvider} from "./leaflet.model";
import {LeafletService} from "./leaflet.service";
import LayersObject = Control.LayersObject;
import "rxjs/add/observable/from";
import "rxjs/add/observable/of";
import "rxjs/add/observable/concat";
import "rxjs/add/operator/do";
import "rxjs/add/operator/mergeMap";

@Component({
  selector: 'surveyor-leaflet',
  template: '<div [id]="mapId" style="height: 100%; width: 100%;"></div>'
})
export class SurveyorLeafletComponent implements AfterViewInit {

  @Input() mapId: string;
  @Input() options?: MapOptions;
  @Output() mapReady = new EventEmitter();
  private map: Map;
  private baseLayers = <LayersObject>{};
  private overlays = <LayersObject>{};
  private first = true;

  constructor(private leafletService: LeafletService,
              private elementRef: ElementRef,
              private renderer: Renderer2) {}

  ngAfterViewInit() {

    // Initialize the primary map object
    if (!this.options) {
      this.options = <MapOptions>{
        center: [37.8, -96],
        zoom: 4,
        maxZoom: 20
      };
    }
    this.options.zoomControl = false;

    this.map = L.map(this.mapId, this.options);

    // Hacks to remove the touch capabilities from leaflet which causes large buttons and boxes
    window['L'].Browser.touch = false;
    let leafletContainerDiv = this.elementRef.nativeElement.querySelector(".leaflet-container");
    this.renderer.removeClass(leafletContainerDiv, 'leaflet-touch');

    /*
    let baseLayerObs = Observable.from(this.leafletService.findBaseLayers(this.mapId))
      .flatMap((provider: LayerProvider) => {
        let layerDefsObs = provider.provide(this.map);
        if (!(layerDefsObs instanceof Observable)) {
          layerDefsObs = Observable.of(layerDefsObs);
        }
        return layerDefsObs.do(layerDefs => {
          layerDefs.forEach((layerDef: LayerDefinition) => {
            this.baseLayers[layerDef.label] = layerDef.layer;
            if (this.first) {
              layerDef.layer.addTo(this.map);
              this.first = false;
            }
          });
        });
      });

    let overlayObs = Observable.from(this.leafletService.findOverlays(this.mapId))
      .flatMap((provider: LayerProvider) => {
        let layerDefsObs = provider.provide(this.map);
        if (!(layerDefsObs instanceof Observable)) {
          layerDefsObs = Observable.of(layerDefsObs);
        }
        return layerDefsObs.do(layerDefs => {
          layerDefs.forEach((layerDef: LayerDefinition) => {
            this.overlays[layerDef.label] = layerDef.layer;
            if ((provider.config && provider.config.enabled && layerDef.enabled !== false) || layerDef.enabled) {
            //if (layerDef.enabled !== false) {
              layerDef.layer.addTo(this.map);
            }
          });
        });
      });

    let featuresObs = Observable.from(this.leafletService.findFeatures(this.mapId))
      .forEach((provider: FeatureProvider) => {
        provider.provide(this.map);
      });

    let controlsObs = Observable.from(this.leafletService.findControls(this.mapId))
      .forEach((provider: ControlProvider) => {
        let control = provider.provide(this.map);
        if (control) {
          control.addTo(this.map);
        }
      });

    let completeObs = new Observable((observer => {
      L.control.layers(this.baseLayers, this.overlays, {}).addTo(this.map);
      this.map.invalidateSize({});
      this.mapReady.emit(this.map);
      observer.next(true);
    }));

    // Chain up the observables to ensure layers are processed in order
    Observable.concat(overlayObs, baseLayerObs, featuresObs, controlsObs, completeObs).subscribe();
    */

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

        if (control) {
          control.addTo(this.map);
        } else {
          console.error("Could not provide control for " + provider.config);
        }
      });

    L.control.layers(baseLayers, overlays, {}).addTo(this.map);

    setTimeout(() => {
      this.renderer.removeClass(this.elementRef.nativeElement.querySelector(".leaflet-container"), 'leaflet-touch');
      this.map.invalidateSize({});
    });

    this.mapReady.emit(this.map);
  }
}
