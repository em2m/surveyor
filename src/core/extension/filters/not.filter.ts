import {Filter, FilterContext} from "../extension.model";

export class NotFilter implements Filter {

  constructor(private testFilter: Filter) {
  }

  filter(filterContext: FilterContext): boolean {
    return !this.testFilter.filter(filterContext);
  }
}
