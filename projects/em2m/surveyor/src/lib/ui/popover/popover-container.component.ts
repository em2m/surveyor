import { Input, Type, ComponentFactoryResolver, ViewChild, ViewContainerRef, Output, EventEmitter, OnInit, ChangeDetectorRef, HostBinding, Directive } from '@angular/core';
import {PopoverOptions} from './popover.model';
import {Popover} from './popover.component';


@Directive()
export abstract class PopoverContainer implements OnInit {

  @Input() popover: Type<Popover>;
  @Input() options: PopoverOptions = {};
  @Input() targetElement: HTMLElement;
  @Output() onSubmit = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  @Output() onMouseNotEver = new EventEmitter();
  @ViewChild('popovertarget', {read: ViewContainerRef, static: true}) popoverTarget: any;
  title: string;
  popoverRef: any;
  isDismissed = false;
  position = 'top';
  resolvedPosition: string;

  maxWidth = 350;
  @HostBinding('style.width') width: string;
  // @HostBinding('style.height') height: string;
  @HostBinding('style.max-height') height: string;
  @HostBinding('style.top') top: string;
  @HostBinding('style.bottom') bottom: string;
  @HostBinding('style.right') right: string;
  @HostBinding('style.left') left: string;
  @HostBinding('style.transform') transform: string;
  anchorTop: string;
  anchorRight: string;
  anchorBottom: string;
  anchorLeft: string;

  protected constructor(private resolver: ComponentFactoryResolver,
                        private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.title = this.options.title;
    this.width = this.options.width + 'px';
    this.height = this.options.height + 'px';
    this.position = this.options.position;

    const factory = this.resolver.resolveComponentFactory(this.popover);
    const popverRef = this.popoverTarget.createComponent(factory);
    popverRef.instance.params = this.options.params;

    // Handle abstract modal output events
    popverRef.instance.onSubmit.subscribe((value: any) => {
      this.onSubmit.emit(value);
    });
    popverRef.instance.onCancel.subscribe((value: any) => {
      this.onCancel.emit(value);
    });
    popverRef.instance.onDelete.subscribe((value: any) => {
      this.onDelete.emit(value);
    });

    // console.log('Popover Ref', popverRef);

    this.cdr.detectChanges();

    this.updatePosition();
  }

  updatePosition() {
    const bounds = this.targetElement.getBoundingClientRect() as DOMRect;
    const sourceWidth = bounds.width;
    const sourceHeight = bounds.height;
    bounds.width = 300;
    bounds.height = 400;

    const position = this.resolvePosition(this.position, bounds);
    this.resolvedPosition = position;
    let top: number;
    let bottom: number;
    let left: number;
    let right: number;
    // let height: number;
    let width: number;
    let transform: string;

    switch (position) {
      case 'left': {
        top = bounds.y + (sourceHeight / 2);
        transform = 'translateY(-50%)';
        width = bounds.width;
        this.anchorTop = '50%';

        if (width > bounds.x - 5) {
          width = bounds.x - 5;
          left = 5;
        } else {
          left = bounds.x - width - 5;
        }

        if ((bounds.height / 2) + bounds.y + 5 > window.innerHeight) {
          // top = window.innerHeight - bounds.height + 10;
          bottom = 5;
          top = null;
          transform = null;

          this.anchorBottom = (window.innerHeight - bounds.y - sourceHeight - 5) + 'px';
          this.anchorTop = null;
        }
        if (bounds.y - (bounds.height / 2) - 5 < 0) {
          top = 5;
          transform = null;

          this.anchorTop = (bounds.y + (sourceHeight / 2) - 5) + 'px';
        }

        break;
      }
      case 'right': {
        top = bounds.y;
        transform = 'translateY(-50%)';
        width = bounds.width;
        this.anchorTop = '50%';

        if (width > window.innerWidth - bounds.x - 5) {
          width = window.innerWidth - bounds.x - 5;
          right = 5;
        } else {
          left = bounds.x + sourceWidth + 5;
        }

        if ((bounds.height / 2) + bounds.y + 5 > window.innerHeight) {
          // top = window.innerHeight - bounds.height + 10;
          bottom = 5;
          top = null;
          transform = null;

          this.anchorBottom = (window.innerHeight - bounds.y - sourceHeight - 5) + 'px';
          this.anchorTop = null;
        }
        if (bounds.y - (bounds.height / 2) - 5 < 0) {
          top = 5;
          transform = null;

          this.anchorTop = (bounds.y + (sourceHeight / 2) - 5) + 'px';
        }

        break;
      }
      case 'bottom': {
        break;
      }
      case 'top': {
        break;
      }
      default: {
      }
    }

    if (left) {
      this.left = left + 'px';
    }
    if (right) {
      this.right = right + 'px';
    }
    if (top) {
      this.top = top + 'px';
    }
    if (bottom) {
      this.bottom = bottom + 'px';
    }
    if (width) {
      this.width = width + 'px';
    }
    /*
    if (height) {
      // this.height = height + 'px';
    }
     */
    if (transform) {
      this.transform = transform;
    }
  }

  resolvePosition(preferredPosition: string, bounds: DOMRect): string {
    let position = preferredPosition;

    if (preferredPosition === 'left') {
      // Check if the preferred side can fit the content fully
      if (bounds.x - bounds.width - 10 < 0) {
        // Check if the right side can fit the content fully
        if (bounds.x + bounds.width + 10 < window.innerWidth) {
          position = 'right';
        } else {
          // Check which side has more space if both can't fit
          if (window.innerWidth - bounds.x > bounds.x) {
            position = 'right';
          }
        }
      }
    } else if (preferredPosition === 'right') {
      if (bounds.x + bounds.width + 10 > window.innerWidth) {
        if (bounds.x - bounds.width - 10 > 0) {
          position = 'left';
        } else {
          // Check which side has more space if both can't fit
          if (window.innerWidth - bounds.x < bounds.x) {
            position = 'left';
          }
        }
      }
    } else if (preferredPosition === 'top') {
      // Check if the preferred side can fit the content fully
      if (bounds.y - bounds.height - 10 < 0) {
        // Check if the right side can fit the content fully
        if (bounds.y + bounds.height + 10 < window.innerHeight) {
          position = 'bottom';
        } else {
          // Check which side has more space if both can't fit
          if (window.innerHeight - bounds.y > bounds.y) {
            position = 'bottom';
          }
        }
      }
    } else if (preferredPosition === 'bottom') {
      // Check if the preferred side can fit the content fully
      if (bounds.y + bounds.height + 10 > window.innerHeight) {
        // Check if the right side can fit the content fully
        if (bounds.y - bounds.height - 10 > 0) {
          position = 'top';
        } else {
          // Check which side has more space if both can't fit
          if (window.innerHeight - bounds.y < bounds.y) {
            position = 'top';
          }
        }
      }
    }

    return position;
  }

  withinViewport(pos) {
    let isWithin = true;
    if (pos[0] < 0) {
      isWithin = false;
    }
    if (pos[1] < 0) {
      isWithin = false;
    }
    if (pos[0] + this.options.width > window.innerWidth) {
      isWithin = false;
    }
    if (pos[1] + this.options.height > window.innerHeight) {
      isWithin = false;
    }
    return isWithin;
  }

  canSubmit(): boolean {
    if (this.popoverRef) {
      return this.popoverRef.instance.canSubmit();
    } else {
      return false;
    }
  }

  submit() {
    if (this.popoverRef) {
      this.popoverRef.instance.submit();
    }
  }

  cancel() {
    if (this.popoverRef) {
      this.popoverRef.instance.cancel();
    }
  }

  dismiss() {
    this.isDismissed = true;
  }
}
