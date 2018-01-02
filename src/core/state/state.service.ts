import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Injectable} from "@angular/core";

@Injectable()
export class StateService {

  private sources: { [key: string]: BehaviorSubject<any>; } = {};

  constructor() {}

  set(key: string, value: any) {
    this.getSource(key).next(value);
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
      source = new BehaviorSubject<any>(null);
      this.sources[key] = source;
    }
    return source;
  }
}
