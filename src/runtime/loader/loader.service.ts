import {Injectable, Injector} from "@angular/core";
import {Route, Router} from "@angular/router";
import {ExtensionService} from "../../core/extension/extension.service";
import {Extension} from "../../core/extension/extension.model";

@Injectable()
export class LoaderService {

  private extensionService: ExtensionService;
  private router: Router;
  private routes: Route[];

  constructor(private injector: Injector) {}

  loadRoutes() {
    this.extensionService = this.injector.get(ExtensionService);
    this.router = this.injector.get(Router);
    this.routes = this.router.config;

    console.log("Routes (Before)", this.routes);

    // Iterate over all of the routes to process subroutes
    this.routes.forEach((route) => this.parseRoute(route));

    console.log("Routes (After)", this.routes);

    // Reset the routes including the complete application routes
    this.router.resetConfig(this.routes);
  }

  parseRoute(route: Route) {
    // Recursive parse children first so extensions are added to the end of the routes
    if (route.children) {
      route.children.forEach((childRoute: Route) => {
        this.parseRoute(childRoute);
      });
    }

    // Check if the route has a target which is the target for dynamic pages
    if (route.data) {
      let routeTarget = route.data['target'];
      if (routeTarget) {
        this.extensionService.getExtensionsForTypeAndTarget("surveyor:page", routeTarget).forEach((extension: Extension) => {
          let extRoute = extension.value as Route;

          if (route.children.map((childRoute) => childRoute.path).indexOf(extRoute.path) < 0) {
            if (!extRoute.data) {
              extRoute.data = {};
            }
            extRoute.data["extended"] = true;

            if (!route.children) {
              route.children = [];
            }
            route.children.push(extRoute);

            // Recursively parse routes of dynamically added pages in case there is a target for the dynamic page
            this.parseRoute(extRoute);
          }
        });
      }
    }
  }
}
