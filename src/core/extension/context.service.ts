import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {AppConfig} from "../config/config.service";
import {Router} from "@angular/router";
import {FilterContext} from "./extension.model";

@Injectable()
export class ContextService {

  private subject = new BehaviorSubject<FilterContext>(new FilterContext());

  constructor(private router: Router, private config: AppConfig) {}

  set(context: FilterContext) {
    context.route = this.router.routerState.snapshot.url;
    context.config = this.config.get();
    //this.subject.next(context);
  }

  get(): FilterContext {
    let context = this.subject.getValue();
    context.route = this.router.routerState.snapshot.url;
    return context;
  }

  onChange(): Observable<FilterContext> {
    return this.subject.asObservable();
  }
}
