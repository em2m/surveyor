import {Filter, FilterContext} from '../extension.model';

export class VisibleFilter implements Filter {

  constructor(private visible: boolean) {
  }

  filter(filterContext: FilterContext): boolean {
    return this.visible;
  }
}
