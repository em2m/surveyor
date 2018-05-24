import {Type} from '@angular/core';

export interface Plugin {
  name: string;
  extensions: { [key: string]: Array<Extension|Type<any>> };
}

export interface Extension {
  value: any;
  config?: any;
  priority?: number;
  target?: string;
  filters?: Array<Filter>;
  deps?: Array<Type<any>>;
}

export interface Filter {
  filter(filterContext: FilterContext): boolean;
}

export class FilterContext {
  values?: { [key: string]: any } = {};
  route?: string;
  config?: any;
  actions?: Array<string> = [];

  constructor() {}

  addActions(actions: Array<string>) {
    actions.forEach(action => {
      // Only add each action once
      if (this.actions.indexOf(action) < 0) {
        this.actions.push(action);
      }
    });
  }

  setActions(actions: Array<string>) {
    this.actions = actions;
  }

  setValue(key: string, data: any) {
    this.values[key] = data;
  }

  getValue(key: string): any {
    return this.values[key];
  }

  clearValues() {
    this.values = {};
  }
}
