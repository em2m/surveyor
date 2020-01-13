import {Intent, IntentResolver, ResolveInfo} from './intent.model';
import {Injectable, Injector, Type} from '@angular/core';
import {Observable, merge} from 'rxjs';
import {filter, toArray} from 'rxjs/operators';



import {ExtensionService} from '../../core/extension/extension.service';
import {Extension} from '../../core/extension/extension.model';

@Injectable()
export class IntentService {

  private INTENT_RESOLVER_EXTENSION_TYPE = 'surveyor:intent-resolver';

  private resolvers: { [action: string]: Array<IntentResolver> } = {};

  constructor(private injector: Injector, private extensionService: ExtensionService) {
    this.registerResolvers();
  }

  private registerResolvers() {
    this.extensionService.getExtensionsForType(this.INTENT_RESOLVER_EXTENSION_TYPE)
      .forEach((extension: Extension) => {
        const action = extension.config.action;
        const resolverType = extension.value as Type<IntentResolver>;
        const resolver: IntentResolver = this.injector.get(resolverType);
        if (!this.resolvers.hasOwnProperty(action)) {
          this.resolvers[action] = [];
        }
        this.resolvers[action].push(resolver);
      });
  }

  // TODO: Return an observable so that we can react to no-handle found
  broadcastIntent(intent: Intent) {
    if (this.resolvers.hasOwnProperty(intent.action)) {
      /*
      merge(...this.resolvers[intent.action].map(resolver => resolver.resolveHandlers(intent))).pipe(
        filter(resolveInfo => resolveInfo !== null),
        toArray()
      ).subscribe((resolutions: Array<ResolveInfo>) => {
        if (resolutions.length === 1) {
          resolutions[0].handler.handleIntent(intent);
        } else if (resolutions.length > 1) {
          // TODO: SHOW INTENT PICKER TO SELECT HANDLER TO RUN
        }
      });
      */

      merge(...this.resolvers[intent.action].map(resolver => resolver.resolveHandlers(intent))).pipe(
        filter(resolveInfo => resolveInfo !== null),
        toArray()
      ).subscribe((resolutions: Array<ResolveInfo>) => {
          if (resolutions.length > 0) {
            resolutions[0].handler.handleIntent(intent);
          }
        });
    }
  }
}
