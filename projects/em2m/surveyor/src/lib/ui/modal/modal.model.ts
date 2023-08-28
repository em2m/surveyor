import {Observable} from "rxjs";
import {ViewContainerRef} from "@angular/core";

export interface ModalOptions {
  params?: any;
  type?: "center" | "side" | "inline" | "fixed";
  title?: string;
  submitLabel?: string;
  cancelLabel?: string;
  deleteLabel?: string;
  hideActions?: boolean;
  hideSubmit?: boolean;
  hideCancel?: boolean;
  hideDelete?: boolean;
  hideTitle?: boolean;
  width?: number;
  noPadding?: boolean;
  elementRef?: ViewContainerRef;
  backgroundColor?: string;
  centeredBtn?: boolean;
}

export interface ModalResult {

  submit: Observable<any>;
  cancel: Observable<any>;
  delete: Observable<any>;
  dismiss();
}
