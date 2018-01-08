import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LeafletPlugin} from "./leaflet.plugin";
import {LeafletService} from "./leaflet.service";
import {SurveyorLeafletComponent} from "./leaflet.component";
import {MapboxProvider} from "./providers/mapbox/mapbox.provider";
import {MapquestProvider} from "./providers/mapquest/mapquest.provider";
import {OpenStreetMapProvider} from "./providers/openstreetmap/openstreetmap.provider";
import {ZoomControlProvider} from "./providers/zoomcontrol/zoom-control.provider";

export * from './leaflet.component';
export * from './leaflet.model';
export * from './leaflet.service';
export * from './leaflet.plugin';
export * from './providers/mapbox/mapbox.provider';
export * from './providers/mapquest/mapquest.provider';
export * from './providers/openstreetmap/openstreetmap.provider';

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
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SurveyorLeafletModule,
      providers: [
        LeafletService,
        MapboxProvider,
        MapquestProvider,
        OpenStreetMapProvider,
        ZoomControlProvider,
        {provide: "PLUGIN", useValue: LeafletPlugin, multi: true}
      ]
    };
  }
}
