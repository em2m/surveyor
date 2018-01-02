import {Filter, FilterContext} from "../extension.model";

export class ActionFilter implements Filter {

  private requiredActions = [];

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
    for (let availableAction of (availableActions || [])) {
      // If the action matches just one of the available actions then the action is permitted
      if (requiredAction.search("^" + availableAction.replace("*", "(.*)") + "$") >= 0) {
        return true;
      }
    }
    return false;
  }
}
