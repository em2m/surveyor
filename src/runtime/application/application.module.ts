import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ApplicationHeaderComponent} from "./header/header.component";
import {ApplicationFooterComponent} from "./footer/footer.component";
import {ApplicationWrapperComponent} from "./wrapper/wrapper.component";
import {ApplicationRoutingModule} from "./application-routing.module";
import {ApplicationUnknownComponent} from "./unknown/unknown.component";
import {SurveyorCoreModule} from "../../core/core.module";
import {MdlModule} from "@angular-mdl/core";
import {ApplicationHeaderService} from "./header/header.service";
import {SurveyorMenuModule} from "../../ui/menu/menu.module";
import {SurveyorDropdownModule} from "../../ui/dropdown/dropdown.module";
import {ApplicationSidenavComponent} from "./sidenav/sidenav.component";
import {SidenavService} from "./sidenav/sidenav.service";
import {MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule} from "@angular/material";
import {LayoutModule} from "@angular/cdk/layout";

export * from './application-routing.module';
export * from './footer/footer.component';
export * from './header/header.component';
export * from './header/header.service';
export * from './sidenav/sidenav.component';
export * from './sidenav/sidenav.service';
export * from './unknown/unknown.component';
export * from './wrapper/wrapper.component';

let components = [
  ApplicationFooterComponent,
  ApplicationHeaderComponent,
  ApplicationWrapperComponent,
  ApplicationUnknownComponent,
  ApplicationSidenavComponent
];

@NgModule({
  imports: [
    CommonModule,
    SurveyorCoreModule,
    ApplicationRoutingModule,
    SurveyorMenuModule,
    SurveyorDropdownModule,
    MdlModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    LayoutModule
  ],
  exports: [
    ...components
  ],
  declarations: [
    ...components
  ],
  providers: [
    ApplicationHeaderService,
    SidenavService
  ]
})
export class SurveyorApplicationModule {
}
