import {ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector, Type, ViewContainerRef} from '@angular/core';
import {Popover} from './popover.component';
import {PopoverOptions, PopoverResult} from './popover.model';
import {StandardPopoverContainer} from './containers/standard/standard-popover-container.component';
import {PopoverContainer} from './popover-container.component';

@Injectable()
export class PopoverService {


  private rootViewContainerRef: ViewContainerRef = null;
  private popoverContainerRef: ComponentRef<PopoverContainer>;
  private targetElement: HTMLElement;
  private popoverOptions: PopoverOptions;
  private pinned = false;
  private currentClass: string = null;
  private popoverClassPrefix = 'em2m-popover-';

  constructor(private resolver: ComponentFactoryResolver, private injector: Injector, private appRef: ApplicationRef) {
    window.addEventListener('click', (event) => {
      if (this.targetElement) {
        if (event.target === this.targetElement ||
          this.isDescendant(this.popoverContainerRef.instance.popoverTarget.element.nativeElement.parentElement, event.target)) {
          this.insideClick();
        } else {
          this.outsideClick();
        }
      }
    });
  }

  isDescendant(parent, child) {
    let node = child.parentNode;
    while (node !== null) {
      if (node === parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }

  setRootViewContainerRef(rootViewContainerRef: ViewContainerRef) {
    this.rootViewContainerRef = rootViewContainerRef;
  }

  bindPopover(popover: Type<Popover>, targetElement: HTMLElement, parentContainer?: HTMLElement, options?: PopoverOptions): PopoverResult {
    //noop if this is the same popover
    if (targetElement.classList.contains(this.currentClass)) {
      return;
    } else {
      this.destroy();
      const newClass = this.randomClassName();
      this.currentClass = newClass;
      this.targetElement = targetElement;
      this.targetElement.classList.add(newClass);
    }

    if (!options) {
      options = {};
    } else {
      this.popoverOptions = {
        closeOnClickOff: options.closeOnClickOff || true,
        closeOnHoverOff: options.closeOnHoverOff || false,
      };
      this.pinned = false;
      this.popoverContainerRef = null;
    }

    let containerRef = options.elementRef;
    const popoverContainer = StandardPopoverContainer;
    if (!containerRef) {
      containerRef = this.rootViewContainerRef;
    }
    if (!containerRef) {
      try {
        const applicationRef: ApplicationRef = this.injector.get(ApplicationRef);
        containerRef = applicationRef['_rootComponents'][0]['_hostElement'].vcRef;
      } catch (e) {
        throw new Error('RootViewContainerRef not initialized.  Call ModalService.setRootViewContainerRef() in AppComponent');
      }
    }

    const factory = this.resolver.resolveComponentFactory(popoverContainer);
    this.popoverContainerRef = containerRef.createComponent(factory);
    this.popoverContainerRef.instance.popover = popover;
    this.popoverContainerRef.instance.options = options;
    this.popoverContainerRef.instance.targetElement = targetElement;

    this.registerMouseLeave();

    return <PopoverResult>{
      submit: this.popoverContainerRef.instance.onSubmit,
      cancel: this.popoverContainerRef.instance.onCancel,
      delete: this.popoverContainerRef.instance.onDelete,
      dismiss: () => {
        this.popoverContainerRef.instance.dismiss();
        setTimeout(() => this.popoverContainerRef.destroy(), 1000);
      }
    };
  }

  private insideClick() {
    if (this.popoverOptions.pinOnClick) {
      this.pinned = true;
    }
  }

  private outsideClick() {
    if (this.popoverOptions.closeOnClickOff && !this.pinned) {
      this.destroy();
    }
  }

  private registerMouseLeave() {
    this.targetElement.onmouseleave = (event) => {
      if (this.popoverOptions.pinOnClick && this.pinned) {
      } else if (this.popoverOptions.closeOnHoverOff) {
        this.destroy();
      }
    };
  }

  private randomClassName(): string {
    return this.popoverClassPrefix + Math.random();
  }

  destroy() {
    //Remove the class definition for the target element
    if (this.targetElement != null) {
      this.targetElement.classList.forEach((className) => {
        if (className.indexOf(this.popoverClassPrefix) > -1) {
          this.targetElement.classList.remove(className);
          if (this.currentClass === className) {
            this.currentClass = null;
          }
        }
      });
    }

    // Remove the Angular component
    if (this.popoverContainerRef != null) {
      if (this.popoverContainerRef.instance != null) {
        this.popoverContainerRef.instance.dismiss();
      }
      this.popoverContainerRef.destroy();
    }
  }
}
