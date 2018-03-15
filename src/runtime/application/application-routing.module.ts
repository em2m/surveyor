import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {ApplicationUnknownComponent} from "./unknown/unknown.component";
import {ApplicationWrapperComponent} from "./wrapper/wrapper.component";

const routes: Routes = [
  {
    path: "",
    data: { target: "surveyor:root" },
    resolve: {},
    children: [
      {
        path: "",
        component: ApplicationWrapperComponent,
        data: { target: "surveyor:apps" },
        resolve: {},
        children: [
          {
            path: "404",
            component: ApplicationUnknownComponent
          },
          /*
          {
            path: "**",
            component: ApplicationUnknownComponent
          }
          */
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ApplicationRoutingModule {
}

