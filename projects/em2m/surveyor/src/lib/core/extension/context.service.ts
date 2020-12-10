import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {AppConfig} from '../config/config.service';
import {Router} from '@angular/router';
import {ContextOptions, FilterContext} from './extension.model';

@Injectable()
export class ContextService {

  private context = new FilterContext();
  private contextSubject = new BehaviorSubject<FilterContext>(this.context);
  private valueSubjects: { [key: string]: BehaviorSubject<any>; } = {};

  constructor(private router: Router, private config: AppConfig) {}

  getContext(): FilterContext {
    this.context.route = this.router.routerState.snapshot.url;
    this.context.config = this.config.get();
    return this.context;
  }

  onContextChange(): Observable<FilterContext> {
    return this.contextSubject.asObservable();
  }

  clearContext() {
    localStorage.clear();
    sessionStorage.clear();

    this.context = new FilterContext();
    this.notifyContext();
  }

  notifyContext() {
    this.contextSubject.next(this.getContext());
  }

  addActions(actions: Array<string>) {
    actions.forEach(action => {
      // Only add each action once
      if (this.context.actions.indexOf(action) < 0) {
        this.context.actions.push(action);
      }
    });
    this.notifyContext();
  }

  setActions(actions: Array<string>) {
    if (JSON.stringify(actions) !== JSON.stringify(actions)) {
      this.context.actions = actions || [];
      this.notifyContext();
    }
  }

  getActions(): Array<string> {
    return this.context.actions || [];
  }

  hasAction(action: string): boolean {
    for (const availableAction of (this.context.actions || [])) {
      // If the action matches just one of the available actions then the action is permitted
      if (action.search('^' + availableAction.replace('*', '(.*)') + '$') >= 0) {
        return true;
      }
    }
    return false;
  }

  setValue(key: string, value: any, options?: ContextOptions) {
    this.context.values[key] = value;
    if (options?.broadcast !== false) {
      this.notifyValue(key);
      this.notifyContext();
    }
  }

  // setValue(key: string, value: any, options?: ContextOptions) {
  //   const prevValue = this.context.values[key];
  //   this.context.values[key] = value;
  //   if ((!prevValue /* || JSON.stringify(prevValue) !== JSON.stringify(value)*/) && options?.broadcast !== false) {
  //     this.notifyValue(key);
  //     this.notifyContext();
  //   }
  // }

  getValue(key: string): any {
    let value = this.context.values[key];
    if (!value) {
      const storedValue = sessionStorage.getItem(key) || localStorage.getItem(key);
      if (storedValue) {
        value = JSON.parse(storedValue);
      }
      this.context.values[key] = value;
    }
    return value;
  }

  clearValues() {
    this.context.values = {};
    for (const key in this.valueSubjects) {
      if (this.valueSubjects.hasOwnProperty(key)) {
        this.notifyValue(key);

        // TODO: MAY NEED TO UNSUBSCRIBE EACH SUBJECT HERE
      }
    }
    this.valueSubjects = {};
    this.notifyContext();
  }

  onValueChange(key: string): Observable<any> {
    return this.getValueSubject(key).asObservable();
  }

  private notifyValue(key: string) {
    this.getValueSubject(key).next(this.context.values[key]);
  }

  private getValueSubject(key: string): BehaviorSubject<any> {
    let valueSubject = this.valueSubjects[key];
    if (!valueSubject) {
      valueSubject = new BehaviorSubject<any>(null);
      this.valueSubjects[key] = valueSubject;
    }
    return valueSubject;
  }
}
