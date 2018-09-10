import {Injectable, Type, ComponentFactoryResolver, Injector, ViewContainerRef, ApplicationRef} from '@angular/core';
import {Modal} from './modal.component';
import {ModalOptions, ModalResult} from './modal.model';
import {CenterModalContainer} from './containers/center/center-modal-container.component';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/do';
import {SideModalContainer} from './containers/side/side-modal-container.component';
import {InlineModalContainer} from './containers/inline/inline-modal-container.component';
import {ConfirmationModal} from './modals/confirmation-modal/confirmation-modal.component';
import {StatusModal} from './modals/status-modal/status-modal.component';
import {LoadingModal} from './modals/loading-modal/loading-modal.component';

@Injectable()
export class ModalService {

  private rootViewContainerRef: ViewContainerRef = null;

  constructor(private resolver: ComponentFactoryResolver, private injector: Injector) {
  }

  setRootViewContainerRef(rootViewContainerRef: ViewContainerRef) {
    this.rootViewContainerRef = rootViewContainerRef;
  }

  open(modal: Type<Modal>, options?: ModalOptions): ModalResult {
    if (!options) {
      options = {};
    }

    let modalContainer = CenterModalContainer;
    if (options.type === 'side') {
      modalContainer = SideModalContainer;
    } else if (options.type === 'inline') {
      modalContainer = InlineModalContainer;
    }
    let containerRef = options.elementRef;
    if (!containerRef) {
      containerRef = this.rootViewContainerRef;
    }
    if (!containerRef) {
      try {
        let applicationRef: ApplicationRef = this.injector.get(ApplicationRef);
        containerRef = applicationRef['_rootComponents'][0]['_hostElement'].vcRef;
      } catch (e) {
        throw new Error('RootViewContainerRef not initialized.  Call ModalService.setRootViewContainerRef() in AppComponent');
      }
    }

    let factory = this.resolver.resolveComponentFactory(modalContainer);
    let modalContainerRef = containerRef.createComponent(factory);
    modalContainerRef.instance.modal = modal;
    modalContainerRef.instance.options = options;

    // Automatically destroy the modal on a cancel action
    modalContainerRef.instance.onCancel.do(() => {
      modalContainerRef.instance.dismiss();
      setTimeout(() => modalContainerRef.destroy(), 1000);
    }).subscribe();

    return <ModalResult> {
      submit: modalContainerRef.instance.onSubmit,
      cancel: modalContainerRef.instance.onCancel,
      delete: modalContainerRef.instance.onDelete,
      dismiss: () => {
        modalContainerRef.instance.dismiss();
        setTimeout(() => modalContainerRef.destroy(), 1000);
      }
    };
  }

  confirm(message: string): Observable<boolean> {
    let options = <ModalOptions> {
      submitLabel: 'Yes',
      cancelLabel: 'No',
      params: { message: message },
      type: 'center'
    };

    let confirmResponse = new Subject<boolean>();

    let modal = this.open(ConfirmationModal, options);
    modal.submit.subscribe((value: boolean) => {
      confirmResponse.next(value);
      modal.dismiss();
    });

    return confirmResponse.asObservable();
  }

  status(message: string): ModalResult {
    let options = <ModalOptions> {
      hideSubmit: true,
      hideCancel: true,
      params: { message: message },
      type: 'center',
      width: 400
    };

    return this.open(StatusModal, options);
  }

  loading(message: string): ModalResult {
    let options = <ModalOptions> {
      hideActions: true,
      params: {
        message: message
      },
      type: 'center',
      width: 450
    };

    return this.open(LoadingModal, options);
  }

  message(message: string) {
    let options = <ModalOptions> {
      hideSubmit: true,
      hideCancel: false,
      cancelLabel: 'OK',
      params: { message: message },
      type: 'center'
    };

    let modal = this.open(ConfirmationModal, options);
    modal.submit.subscribe((value: boolean) => {
      modal.dismiss();
    });
  }
}
