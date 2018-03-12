import {Observable} from "rxjs/Observable";
import {EventEmitter} from "@angular/core";

export interface Card {
  id?: string;
  iconClass?: string;
  type?: string;
  style?: string;
  name?: string;
  title?: string;
  category?: string;
  actionGroup?: string;
  priority?: number;
  gridWidth?: number;
  config?: any;
  hide?: EventEmitter<any>;
  init(context: Observable<any>);
}

export class CardSupport<T> implements Card {

  context: any;
  hide: EventEmitter<any> = new EventEmitter<any>();
  hidden = false;

  hideCard() {
    this.hidden = true;
    this.hide.emit(true);
  }

  showCard() {
    this.hidden = false;
    this.hide.emit(false);
  }

  init(contextObs: Observable<any>) {
    if (contextObs) {
      contextObs.subscribe(context => {
        this.context = context;
      });
    }
  }
}
