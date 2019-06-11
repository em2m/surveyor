import {Injectable, Inject, Type} from '@angular/core';
import {Router} from '@angular/router';
import {Plugin, Extension} from './extension.model';
import {FilterUtils} from './filters/filter.util';
import {ContextService} from './context.service';

@Injectable()
export class ExtensionService {

  public DEFAULT_PRIORITY = 99;

  private pluginRegistry: { [name: string]: Plugin } = {};
  private extensionsByType: { [type: string]: Array<Extension> } = {};
  private extensionsByTarget: { [type: string]: Array<Extension> } = {};

  constructor(@Inject('PLUGIN') plugins: Plugin[],
              private router: Router,
              private contextService: ContextService) {
    this.loadPlugins(plugins);
  }

  private loadPlugins(plugins: Plugin[]) {
    plugins.forEach((plugin: Plugin) => {
      if (!this.pluginRegistry[plugin.name]) {
        this.pluginRegistry[plugin.name] = plugin;

        // console.log('Loading Plugin: ' + plugin.name);

        if (plugin.extensions) {
          for (let extensionType in plugin.extensions) {
            if (plugin.extensions.hasOwnProperty(extensionType)) {
              let extensions = plugin.extensions[extensionType];
              extensions.forEach((ext: Extension) => {
                // console.log("Registering Extension: ", extensionType, ext);
                this.registerExtension(extensionType, ext.target, ext);
              });
            }
          }
        }
      }
    });
  }

  private registerExtension(type: string, target: string, extension: any) {
    let extensionsForType = this.extensionsByType[type];
    if (!extensionsForType) {
      extensionsForType = [];
      this.extensionsByType[type] = extensionsForType;
    }

    let extensionsForTarget = this.extensionsByTarget[target];
    if (!extensionsForTarget) {
      extensionsForTarget = [];
      this.extensionsByTarget[target] = extensionsForTarget;
    }

    if (extension instanceof Type) {
      extension = { value: extension };
    }
    extensionsForType.push(extension);
    extensionsForTarget.push(extension);
  }

  pluginIsLoaded(pluginName: string): boolean {
    return !!this.pluginRegistry[pluginName]
  }

  getExtensionById(type: string, id: string): Extension {
    for (let extension of this.extensionsByType[type] || []) {
      let config = extension.config || {};
      if (config.id === id) {
        return extension;
      }
    }
    return null;
  }

  getExtensionsForType(type: string): Array<Extension> {
    let extensions = this.extensionsByType[type] || [];
    return extensions
      .map(extension => {
        if (extension.priority === undefined) {
          extension.priority = this.DEFAULT_PRIORITY;
        }
        return extension;
      })
      .filter((extension: Extension) => {
        let filterContext = this.contextService.getContext();
        return FilterUtils.isPermitted(filterContext, extension.filters);
      })
      .sort((ext1: Extension, ext2: Extension) => {
        if (ext1.priority === ext2.priority) { return 0; }
        if (ext1.priority < ext2.priority) { return -1; }
        return 1;
      });
  }

  getExtensionsForTypeAndTarget(type: string, target: string): Array<Extension> {
    let extensions = this.extensionsByType[type] || [];
    return extensions
      .map(extension => {
        if (extension.priority === undefined) {
          extension.priority = this.DEFAULT_PRIORITY;
        }
        return extension;
      })
      .filter((ext: Extension) => {
        return ext.target === target;
      })
      .filter((extension: Extension) => {
        let filterContext = this.contextService.getContext();
        return FilterUtils.isPermitted(filterContext, extension.filters);
      })
      .sort((ext1: Extension, ext2: Extension) => {
        if (ext1.priority === ext2.priority) { return 0; }
        if (ext1.priority < ext2.priority) { return -1; }
        return 1;
      });
  }

  getExtensionsForTarget(target: string): Array<Extension> {
    let extensions = this.extensionsByTarget[target] || [];
    return extensions
      .map(extension => {
        if (extension.priority === undefined) {
          extension.priority = this.DEFAULT_PRIORITY;
        }
        return extension;
      })
      .filter((ext: Extension) => {
        return ext.target === target;
      })
      .filter((extension: Extension) => {
        let filterContext = this.contextService.getContext();
        return FilterUtils.isPermitted(filterContext, extension.filters);
      })
      .sort((ext1: Extension, ext2: Extension) => {
        if (ext1.priority === ext2.priority) { return 0; }
        if (ext1.priority < ext2.priority) { return -1; }
        return 1;
      });
  }
}
