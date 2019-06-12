import {Observable} from "rxjs";
import {ViewContainerRef} from "@angular/core";

export interface PopoverOptions {
  params?: any;
  position?: 'top' | 'bottom' | 'left' | 'right';
  title?: string;
  containerType?: 'standard' | 'side';
  width?: number;
  height?: number;
  htmlElement?: HTMLElement;
  elementRef?: ViewContainerRef;
  closeOnHoverOff?: boolean;
  closeOnClickOff?: boolean;
  pinOnClick?: false;
}

export interface PopoverResult {
  submit: Observable<any>;
  cancel: Observable<any>;
  delete: Observable<any>;
  dismiss();
}

export interface PopoverContainerModel {
  width?: number;
  height?: number;
  posx?: number;
  posy?: number;
}
