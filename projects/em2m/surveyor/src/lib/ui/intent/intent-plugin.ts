import {Route} from '@angular/router';
import {IntentComponent} from './intent.component';
import {IntentGuard} from './intent.guard';
import {Plugin} from '../../core/extension/extension.model';

export let IntentPlugin: Plugin = {

  name: 'Intent Plugin',
  extensions: {
    'surveyor:page': [
      {
        value: {
          path: 'action/:actionId',
          component: IntentComponent,
          canActivate: [IntentGuard],
          data: {
            target: 'intent:actions'
          }
        },
        target: 'surveyor:apps',
        priority: 10
      }
    ]
  }
};
