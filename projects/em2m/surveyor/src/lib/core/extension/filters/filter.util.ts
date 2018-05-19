import {FilterContext, Filter} from '../extension.model';

export class FilterUtils {

  static isPermitted(filterContext: FilterContext, filters: Array<Filter>): boolean {
    let permitted = true;

    // If no filters are present then the extension is always permitted
    if (filters) {
      if (!filterContext && filters && filters.length > 0) {
        // If a filter context was omitted and there are filters, always filter out the extension
        permitted = false;
      } else {
        // If any filters are present, all filters must return true for the action to be permitted
        for (let filter of filters) {
          if (!filter.filter(filterContext)) {
            permitted = false;
            break;
          }
        }
      }
    }
    return permitted;
  }
}
