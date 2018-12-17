import {Observable} from 'rxjs';

export interface Intent {
  action: string;
  type?: string;
  category?: string;
  data?: { [key: string]: any };
  extras?: { [key: string]: any };
}

export interface ResolveInfo {
  label: string;
  description?: string;
  icon?: string;
  handler: IntentHandler;
}

export interface IntentResolver {
  resolveHandlers(intent: Intent): Observable<ResolveInfo>;
}

export interface IntentHandler {
  handleIntent(intent: Intent);
}
