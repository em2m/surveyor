import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Injectable} from "@angular/core";

@Injectable()
export class StateService {

  private sources: { [key: string]: BehaviorSubject<any>; } = {};

  constructor() {}

  set(key: string, value: any, storage: "NONE" | "LOCAL" | "SESSION" = "NONE") {
    this.getSource(key).next(value);

    if (storage === "LOCAL") {
      localStorage.setItem(key, JSON.stringify(value));
    } else if (storage === "SESSION") {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  }

  get(key: string): any {
    return this.getSource(key).getValue();
  }

  watch(key: string): Observable<any> {
    return this.getSource(key).asObservable();
  }

  private getSource(key: string): BehaviorSubject<any> {
    let source = this.sources[key];
    if (!source) {
      let storedValue = sessionStorage.getItem(key) || localStorage.getItem(key);
      if (storedValue) {
        storedValue = JSON.parse(storedValue);
      }
      source = new BehaviorSubject<any>(storedValue);
      this.sources[key] = source;
    }
    return source;
  }
}
