import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {AppConfig} from "../config/config.service";
import {Router} from "@angular/router";
import {FilterContext} from "./extension.model";

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
    return this.contextSubject.asObservable().map((context) => {
      return context;
    });
  }

  clearContext() {
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

  setValue(key: string, value: any) {
    let prevValue = this.context.values[key];
    //if (!prevValue || JSON.stringify(prevValue) !== JSON.stringify(value)) {
      this.context.values[key] = value;
      this.notifyValue(key);
      this.notifyContext();
    //}
  }

  getValue(key: string): any {
    return this.context.values[key];
  }

  clearValues() {
    this.context.values = {};
    for (let key in this.valueSubjects) {
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
