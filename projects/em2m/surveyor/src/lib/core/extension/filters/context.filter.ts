import {Filter, FilterContext} from '../extension.model';

export class ContextFilter implements Filter {

  constructor(private filterFunction: (filterContext: FilterContext) => boolean) {}

  filter(context: FilterContext): boolean {
    return this.filterFunction(context);
  }
}
