import {Filter, FilterContext} from '../extension.model';

export class ConfigFilter implements Filter {

  constructor(private configPath: string, private configValue: any) {}

  filter(filterContext: FilterContext): boolean {
    if (!this.configPath || !filterContext.config) {
      return false;
    }
    let configTempValue = filterContext.config;
    let configSegments = this.configPath.split('.');
    for (let i = 0; i < configSegments.length; i++) {
      configTempValue = configTempValue?.[configSegments[i]];
    }
    if (configTempValue === undefined || configTempValue === null) {
      return false;
    } else {
      return configTempValue === this.configValue;
    }
  }
}
