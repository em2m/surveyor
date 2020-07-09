import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LeafletPlugin} from './leaflet.plugin';
import {LeafletService} from './leaflet.service';
import {SurveyorLeafletComponent} from './leaflet.component';
import {MapboxProvider} from './providers/mapbox/mapbox.provider';
import {MapquestProvider} from './providers/mapquest/mapquest.provider';
import {OpenStreetMapProvider} from './providers/openstreetmap/openstreetmap.provider';
import {ZoomControlProvider} from './providers/zoomcontrol/zoom-control.provider';
import {GoogleMapsProvider} from './providers/google-maps/google-maps.provider';
import {GoogleMapsLoaderService} from './providers/google-maps/google-maps-loader.service';
import {GoogleStreetViewControlProvider} from './providers/google-maps/google-street-view-control.provider';
//import {AppleMapkitProvider} from './providers/apple-mapkit-js/apple-mapkit.provider';
//import {AppleMapkitLoaderService} from './providers/apple-mapkit-js/apple-mapkit-loader.service';

export * from './leaflet.component';
export * from './leaflet.model';
export * from './leaflet.service';
export * from './leaflet.plugin';
export * from './providers/mapbox/mapbox.provider';
export * from './providers/mapquest/mapquest.provider';
export * from './providers/google-maps/google-maps.provider';
export * from './providers/google-maps/google-street-view-control.provider';
export * from './providers/google-maps/google-maps-loader.service';
export * from './providers/openstreetmap/openstreetmap.provider';
export * from './providers/zoomcontrol/zoom-control.provider';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    SurveyorLeafletComponent
  ],
  declarations: [
    SurveyorLeafletComponent
  ],
  entryComponents: [
    SurveyorLeafletComponent
  ]
})
export class SurveyorLeafletModule {
  static forRoot(): ModuleWithProviders<SurveyorLeafletModule> {
    return {
      ngModule: SurveyorLeafletModule,
      providers: [
        LeafletService,
        MapboxProvider,
        MapquestProvider,
        GoogleMapsProvider,
        GoogleMapsLoaderService,
        //AppleMapkitProvider,
        //AppleMapkitLoaderService,
        OpenStreetMapProvider,
        ZoomControlProvider,
        GoogleStreetViewControlProvider,
        {provide: 'PLUGIN', useValue: LeafletPlugin, multi: true}
      ]
    };
  }
}
