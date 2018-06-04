import {Filter, FilterContext} from '../extension.model';

export class ExplicitActionFilter implements Filter {

  private readonly requiredActions = [];

  constructor(...requiredActions: Array<string>) {
    this.requiredActions = requiredActions;
  }

  filter(filterContext: FilterContext): boolean {
    if (!filterContext) { return false; }

    for (let requiredAction of this.requiredActions) {
      if (!this.isActionPermitted(requiredAction, filterContext.actions)) {
        return false;
      }
    }
    return true;
  }

  isActionPermitted(requiredAction: string, availableActions: Array<string>): boolean {
    return availableActions.indexOf(requiredAction) >= 0;
  }
}
