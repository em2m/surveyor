import {Filter, FilterContext} from "../extension.model";

export class OrFilter implements Filter {

  private testFilters: Filter[];

  constructor(...testFilters: Filter[]) {
    this.testFilters = testFilters;
  }

  filter(filterContext: FilterContext): boolean {
    for (let testFilter of this.testFilters) {
      if (testFilter.filter(filterContext)) {
        return true;
      }
    }
    return false;
  }
}
