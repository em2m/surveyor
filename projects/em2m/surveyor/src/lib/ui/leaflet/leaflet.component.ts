import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, NgZone, OnDestroy, Output, Renderer2} from '@angular/core';
import * as L from 'leaflet';
import {Control, Map, MapOptions} from 'leaflet';
import {ControlProvider, FeatureProvider, LayerDefinition, LayerProvider} from './leaflet.model';
import {Observable} from 'rxjs';
import {LeafletService} from './leaflet.service';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/concatMap';
import LayersObject = Control.LayersObject;

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
    const leafletContainerDiv = this.elementRef.nativeElement.querySelector('.leaflet-container');
    this.renderer.removeClass(leafletContainerDiv, 'leaflet-touch');

    const baseLayerObs = Observable.from(this.leafletService.findBaseLayers(this.mapId))
      .concatMap((provider: LayerProvider) => {
        let layerDefsObs = provider.provide(this.map);
        if (!(layerDefsObs instanceof Observable)) {
          layerDefsObs = Observable.of(layerDefsObs);
        }
        return layerDefsObs.do(layerDefs => {
          if (this.first) {
            this.leafletService.setMapBaseLayers(this.mapId, layerDefs);
          }
          layerDefs.forEach((layerDef: LayerDefinition) => {
            this.baseLayers[layerDef.label] = layerDef.layer;
            if (this.first) {
              layerDef.layer.addTo(this.map);
              this.first = false;
            }
          });
        });
      });

    const overlayObs = Observable.from(this.leafletService.findOverlays(this.mapId))
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

    const featuresObs = Observable.from(this.leafletService.findFeatures(this.mapId))
      .concatMap((provider: FeatureProvider) => {
        provider.provide(this.map);
        return Observable.of(null);
      });

    const controlsObs = Observable.from(this.leafletService.findControls(this.mapId))
      .concatMap((provider: ControlProvider) => {
        const control = provider.provide(this.map);
        if (control) {
          control.addTo(this.map);
        }
        return Observable.of(null);
      });

    const completeObs = Observable.of(null).map(() => {
      this.renderer.removeClass(this.elementRef.nativeElement.querySelector('.leaflet-container'), 'leaflet-touch');

      // Persist the control layer in case controls need to be added manually
      const controlLayers = L.control.layers(this.baseLayers, this.overlays, {});
      this.leafletService.setLayerControl(this.mapId, controlLayers);
      controlLayers.addTo(this.map);

      this.map.invalidateSize({});
      this.mapReady.emit(this.map);
    });

    // Chain up the observables to ensure layers are processed in order
    Observable.concat(baseLayerObs, overlayObs, featuresObs, controlsObs, completeObs).subscribe();
  }
}
