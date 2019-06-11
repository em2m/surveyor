import {Input, Type, ComponentFactoryResolver, ViewChild, ViewContainerRef, Output, EventEmitter, OnInit, ChangeDetectorRef, HostBinding} from '@angular/core';
import {PopoverOptions} from './popover.model';
import {Popover} from './popover.component';


export abstract class PopoverContainer implements OnInit {

  @Input() popover: Type<Popover>;
  @Input() options: PopoverOptions = {};
  @Input() targetElement: HTMLElement;
  @Output() onSubmit = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  @Output() onMouseNotEver = new EventEmitter();
  @ViewChild('popovertarget', {read: ViewContainerRef}) popoverTarget: any;
  title: string;
  popoverRef: any;
  isDismissed = false;
  position = 'top';

  @HostBinding('style.width') width: string;
  @HostBinding('style.height') height: string;
  @HostBinding('style.top') top: string;
  @HostBinding('style.bottom') bottom: string;
  @HostBinding('style.right') right: string;
  @HostBinding('style.left') left: string;

  constructor(private resolver: ComponentFactoryResolver, private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.title = this.options.title;
    this.width = this.options.width + 'px';
    this.height = this.options.height + 'px';
    this.position = this.options.position;

    this.calculatePositioning();

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
    this.popoverRef = popverRef;
  }

  calculatePositioning() {
    const boundingRect = this.targetElement.getBoundingClientRect() as DOMRect;
    let pos = this.getPos(this.position, boundingRect);

    if (!this.withinViewport(pos)) {
      pos = this.getPos('left', boundingRect);
    }
    if (!this.withinViewport(pos)) {
      pos = this.getPos('top', boundingRect);
    }
    if (!this.withinViewport(pos)) {
      pos = this.getPos('right', boundingRect);
    }
    if (!this.withinViewport(pos)) {
      pos = this.getPos('bottom', boundingRect);
    }

    this.left = pos[0] + 'px';
    this.top = pos[1] + 'px';
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

  getPos(position: string, boundingRect: DOMRect) {
    let pos = []
    switch (position) {
      case 'left': {
        pos = [boundingRect.x - this.options.width - 10, boundingRect.y - (this.options.height / 2) + (boundingRect.height / 2)];
        break;
      }
      case 'right': {
        pos = [boundingRect.x + boundingRect.width + 10, boundingRect.y - (this.options.height / 2) + (boundingRect.height / 2)];
        break;
      }
      case 'bottom': {
        pos = [boundingRect.x - (this.options.width / 2) + (boundingRect.width / 2), boundingRect.y + boundingRect.height + 10];
        break;
      }
      case 'top': {
        pos = [boundingRect.x - (this.options.width / 2) + (boundingRect.width / 2), boundingRect.y - this.options.height - 10];
        break;
      }
      default: {
        pos = [boundingRect.x - this.options.width - 10, boundingRect.y - (this.options.height / 2) + (boundingRect.height / 2)];
      }
    }
    return pos;
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
