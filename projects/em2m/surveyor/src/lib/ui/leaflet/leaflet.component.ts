import {AfterViewInit, Component, ElementRef, Renderer2, Input, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy, NgZone} from '@angular/core';
import * as L from 'leaflet';
import {Control, Map, MapOptions} from 'leaflet';
import {ControlProvider, FeatureProvider, LayerDefinition, LayerProvider} from './leaflet.model';
import LayersObject = Control.LayersObject;
import {Observable, of, from} from 'rxjs';
import {concat, merge, tap, mergeMap, concatMap} from 'rxjs/operators'
import {LeafletService} from './leaflet.service';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/concatMap';

@Component({
  selector: 'surveyor-leaflet',
  template:
      `<div [id]="mapId" style="height: 100%; width: 100%;">
      </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SurveyorLeafletComponent implements AfterViewInit, OnDestroy {

  @Input() mapId: string;
  @Input() options?: MapOptions;
  @Output() mapReady = new EventEmitter();
  private map: Map;
  private baseLayers = <LayersObject>{};
  private overlays = <LayersObject>{};
  private first = true;

  constructor(private leafletService: LeafletService,
              private elementRef: ElementRef,
              private renderer: Renderer2,
              private ngZone: NgZone) {}

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
    this.leafletService.setMap(this.mapId, null);
  }

  ngAfterViewInit() {
    // Initialize the primary map object
    if (!this.options) {
      this.options = <MapOptions>{
        center: [37.8, -96],
        zoom: 4,
        maxZoom: 20,
        //minZoom: 4
      };
    }
    this.options.zoomControl = false;

    this.ngZone.runOutsideAngular(() => {
      this.map = L.map(this.mapId, this.options);
    });

    // Hacks to remove the touch capabilities from leaflet which causes large buttons and boxes
    window['L'].Browser['touch'] = false;
    let leafletContainerDiv = this.elementRef.nativeElement.querySelector('.leaflet-container');
    this.renderer.removeClass(leafletContainerDiv, 'leaflet-touch');

    if (typeof window['elementResizeDetectorMaker'] === 'function') {
      const erd = window['elementResizeDetectorMaker']({strategy: 'scroll'})
      erd.listenTo(leafletContainerDiv, (element) => {
        this.map.invalidateSize()
      })
    }


    let baseLayerObs = Observable.from(this.leafletService.findBaseLayers(this.mapId))
      .concatMap((provider: LayerProvider) => {
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
      .concatMap((provider: LayerProvider) => {
        let layerDefsObs = provider.provide(this.map);
        if (!(layerDefsObs instanceof Observable)) {
          layerDefsObs = Observable.of(layerDefsObs);
        }
        return layerDefsObs.do(layerDefs => {
          if (layerDefs) {
            layerDefs.forEach((layerDef: LayerDefinition) => {
              this.overlays[layerDef.label] = layerDef.layer;
              if ((provider.config && provider.config.enabled && layerDef.enabled !== false) || layerDef.enabled) {
                layerDef.layer.addTo(this.map);
              }
            });
          }
        });
      });

    let featuresObs = Observable.from(this.leafletService.findFeatures(this.mapId))
      .concatMap((provider: FeatureProvider) => {
        provider.provide(this.map);
        return Observable.of(null);
      });

    let controlsObs = Observable.from(this.leafletService.findControls(this.mapId))
      .concatMap((provider: ControlProvider) => {
        let control = provider.provide(this.map);
        if (control) {
          control.addTo(this.map);
        }
        return Observable.of(null);
      });

    let completeObs = Observable.of(null).map(() => {
      this.renderer.removeClass(this.elementRef.nativeElement.querySelector('.leaflet-container'), 'leaflet-touch');

      // Persist the control layer in case controls need to be added manually
      let controlLayers = L.control.layers(this.baseLayers, this.overlays, {});
      this.leafletService.setLayerControl(this.mapId, controlLayers);
      controlLayers.addTo(this.map);

      this.map.invalidateSize({});
      this.mapReady.emit(this.map);
    });

    // Chain up the observables to ensure layers are processed in order
    Observable.concat(baseLayerObs, overlayObs, featuresObs, controlsObs, completeObs).subscribe();

    /*
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
          console.error('Could not provide control for ' + provider.config);
        }
      });

    // Persist the control layer in case controls need to be added manually
    let controlLayers = L.control.layers(baseLayers, overlays, {});
    this.leafletService.setLayerControl(this.mapId, controlLayers);
    controlLayers.addTo(this.map);

    setTimeout(() => {
      this.renderer.removeClass(this.elementRef.nativeElement.querySelector('.leaflet-container'), 'leaflet-touch');
      this.map.invalidateSize({});
    });

    this.mapReady.emit(this.map);
    */
  }
}
