import {ModuleWithProviders, NgModule} from "@angular/core";
import {GeoPlugin} from "./geo.plugin";
import {GeoService} from "./geo.service";
import {MapboxGeoProvider} from "./providers/mapbox/mapbox.provider";
import {MapquestGeoProvider} from "./providers/mapquest/mapquest.provider";
import {CommonModule} from "@angular/common";

export * from "./geo.model";
export * from "./geo.plugin";
export * from "./geo.service";
export * from "./providers/mapbox/mapbox.provider";
export * from "./providers/mapquest/mapquest.provider";

@NgModule({
  imports: [
    CommonModule
  ]
})
export class SurveyorGeoModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SurveyorGeoModule,
      providers: [
        GeoService,
        MapboxGeoProvider,
        MapquestGeoProvider,
        {provide: "PLUGIN", useValue: GeoPlugin, multi: true}
      ]
    };
  }
}
