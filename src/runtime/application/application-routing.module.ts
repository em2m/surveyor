import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {ApplicationUnknownComponent} from "./unknown/unknown.component";
import {ApplicationWrapperComponent} from "./wrapper/wrapper.component";

const routes: Routes = [
  {
    path: "",
    data: { target: "surveyor:root" },
    children: [
      {
        path: "",
        component: ApplicationWrapperComponent,
        data: { target: "surveyor:apps" },
        children: [
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

