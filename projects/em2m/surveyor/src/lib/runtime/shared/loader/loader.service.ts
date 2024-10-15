import {Injectable, Injector} from '@angular/core';
import {Route, Router} from '@angular/router';
import {ExtensionService} from '../../../core/extension/extension.service';
import {Extension} from '../../../core/extension/extension.model';

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

    // Iterate over all of the routes to process subroutes
    this.routes.forEach((route) => this.parseRoute(route));

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
      const routeTarget = route.data.target;
      if (routeTarget) {
        this.extensionService.getExtensionsForTypeAndTarget('surveyor:page', routeTarget).forEach((routeExt: Extension) => {
          const extRoute = routeExt.value as Route;
          console.log(extRoute)
          console.log(extRoute.path)
          console.log(extRoute.canActivate)

          // Process all resolver extensions
          this.extensionService.getExtensionsForTypeAndTarget('surveyor:resolver', routeTarget).forEach((resolverExt: Extension) => {
            console.log(route.path)
            console.log(route.resolve)
            if (!route.resolve) {
              route.resolve = {};
            }
            console.log(resolverExt.config.key)
            console.log(resolverExt.value)
            route.resolve[resolverExt.config.key] = resolverExt.value;
          });

          // Process all guard extensions
          this.extensionService.getExtensionsForTypeAndTarget('surveyor:guard', routeTarget).forEach((guardExt: Extension) => {
            if (!route.canActivate) {
              route.canActivate = [];
            }
            if (!route.canActivateChild) {
              route.canActivateChild = [];
            }

            if (guardExt.config?.canActivate !== false) {
              route.canActivate.push(guardExt.value);
            }

            if (guardExt.config?.canActivateChild !== false) {
              route.canActivateChild.push(guardExt.value);
            }
          });

          // Process each child in the tree recursively
          if (route.children.map((childRoute) => childRoute.path).indexOf(extRoute.path) < 0) {
            if (!extRoute.data) {
              extRoute.data = {};
            }
            extRoute.data.extended = true;

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
