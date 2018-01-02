import {Filter, FilterContext} from "../extension.model";

export class RouteFilter implements Filter {

  constructor(private routePattern: string, private not: boolean = false) {
  }

  filter(filterContext: FilterContext): boolean {
    let regexp = new RegExp(this.routePattern);
    return this.not ? !regexp.test(filterContext.route) : regexp.test(filterContext.route);
  }
}
