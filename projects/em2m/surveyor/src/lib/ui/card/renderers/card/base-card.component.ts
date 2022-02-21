import { Input, EventEmitter, ComponentRef, ViewChild, ViewContainerRef, Directive } from '@angular/core';
import {Card} from '../../card.model';

@Directive()
export abstract class BaseCardComponent {

  @Input() cardId: string;
  @Input() last?: boolean;
  @ViewChild('cardTarget', {read: ViewContainerRef, static: true}) target: any;
  cardRef: ComponentRef<any>;
  card: Card;
  failed = false;
  hidden = false;
  loadedObs: EventEmitter<any> = new EventEmitter<any>();
}
