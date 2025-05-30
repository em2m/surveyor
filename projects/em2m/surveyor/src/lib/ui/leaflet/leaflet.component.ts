
import {concat as observableConcat, from as observableFrom, of as observableOf, Observable, Subscription} from 'rxjs';
import {map, concatMap, tap} from 'rxjs/operators';
import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, NgZone, OnDestroy, Output, Renderer2} from '@angular/core';
import * as L from 'leaflet';
import {Control, Map, MapOptions} from 'leaflet';
import {ControlProvider, FeatureProvider, LayerDefinition, LayerProvider} from './leaflet.model';
import {LeafletService} from './leaflet.service';
import LayersObject = Control.LayersObject;
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'surveyor-leaflet',
  template: `<div [id]="mapId" style="height: 100%; width: 100%;"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SurveyorLeafletComponent implements AfterViewInit, OnDestroy {

  @Input() mapId: string;
  @Input() options?: MapOptions;
  @Output() mapReady = new EventEmitter();
  private map: Map;
  private baseLayers: LayersObject = {};
  private overlays: LayersObject = {};
  private first = true;
  private controls: Array<Control> = [];
  private routerSub: Subscription;

  constructor(private leafletService: LeafletService,
              private elementRef: ElementRef,
              private renderer: Renderer2,
              private ngZone: NgZone,
              private router: Router) {
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
    this.leafletService.setMap(this.mapId, null);
    this.routerSub?.unsubscribe();
  }

  onRouterUpdate() {
    this.controls.forEach(control => control.remove());
    this.controls = [];
    this.leafletService.findControls(this.mapId).forEach(provider => {
      const control = provider.provide(this.map);
      if (control) {
        try {
          control.addTo(this.map);
          this.controls.push(control);
        } catch (error) {
          // console.log(error)
        }
      }
    });
  }

  ngAfterViewInit() {
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.onRouterUpdate();
      }
    });

    setTimeout(() => {
      // Initialize the primary map object
      if (!this.options) {
        this.options = {
          center: [37.8, -96],
          zoom: 4,
          maxZoom: 20,
          // minZoom: 4
        } as MapOptions;
      }
      this.options.zoomControl = false;

      this.ngZone.runOutsideAngular(() => {
        this.map = L.map(this.mapId, this.options);
      });

      // Hacks to remove the touch capabilities from leaflet which causes large buttons and boxes
      (window.L.Browser as any).touch = false;
      const leafletContainerDiv = this.elementRef.nativeElement.querySelector('.leaflet-container');
      this.renderer.removeClass(leafletContainerDiv, 'leaflet-touch');

      const baseLayerObs = observableFrom(this.leafletService.findBaseLayers(this.mapId)).pipe(
        concatMap((provider: LayerProvider) => {
          let layerDefsObs = provider.provide(this.map);
          if (!(layerDefsObs instanceof Observable)) {
            layerDefsObs = observableOf(layerDefsObs);
          }
          return layerDefsObs.pipe(tap(layerDefs => {
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
          }));
        }));

      const overlayObs = observableFrom(this.leafletService.findOverlays(this.mapId)).pipe(
        concatMap((provider: LayerProvider) => {
          let layerDefsObs = provider.provide(this.map);
          if (!(layerDefsObs instanceof Observable)) {
            layerDefsObs = observableOf(layerDefsObs);
          }
          return layerDefsObs.pipe(tap(layerDefs => {
            if (layerDefs) {
              layerDefs.forEach((layerDef: LayerDefinition) => {
                this.overlays[layerDef.label] = layerDef.layer;
                if ((provider.config && provider.config.enabled && layerDef.enabled !== false) || layerDef.enabled) {
                  layerDef.layer.addTo(this.map);
                }
              });
            }
          }));
        }));

      const featuresObs = observableFrom(this.leafletService.findFeatures(this.mapId)).pipe(
        concatMap((provider: FeatureProvider) => {
          provider.provide(this.map);
          return observableOf(null);
        }));

      this.controls.forEach(control => control.remove());
      this.controls = [];
      const controlsObs = observableFrom(this.leafletService.findControls(this.mapId)).pipe(
        concatMap((provider: ControlProvider) => {
          const control = provider.provide(this.map);
          this.controls.push(control);
          if (control) {
            control.addTo(this.map);
          }
          return observableOf(null);
        }));

      const completeObs = observableOf(null).pipe(map(() => {
        // const leafletContainerDiv = this.elementRef.nativeElement.querySelector('.leaflet-container');
        this.renderer.removeClass(leafletContainerDiv, 'leaflet-touch');

        // Persist the control layer in case controls need to be added manually
        const controlLayers = L.control.layers(this.baseLayers, this.overlays, {});
        this.leafletService.setLayerControl(this.mapId, controlLayers);
        controlLayers.addTo(this.map);

        this.map.invalidateSize({});
        this.mapReady.emit(this.map);
      }));

      // Chain up the observables to ensure layers are processed in order
      observableConcat(baseLayerObs, overlayObs, featuresObs, controlsObs, completeObs).subscribe();
    }, 0);
  }

  hideLayer(layerLabel: string) {
    this.overlays[layerLabel].removeFrom(this.map);
  }
}
