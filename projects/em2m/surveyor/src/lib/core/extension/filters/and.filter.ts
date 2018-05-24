import {Filter, FilterContext} from '../extension.model';

export class AndFilter implements Filter {

  private readonly testFilters: Filter[];

  constructor(...testFilters: Filter[]) {
    this.testFilters = testFilters;
  }

  filter(filterContext: FilterContext): boolean {
    for (let testFilter of this.testFilters) {
      if (!testFilter.filter(filterContext)) {
        return false;
      }
    }
    return true;
  }
}
