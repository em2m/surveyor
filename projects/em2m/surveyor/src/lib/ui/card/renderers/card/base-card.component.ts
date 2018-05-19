import {Input, EventEmitter, ComponentRef, ViewChild, ViewContainerRef} from "@angular/core";
import {Card} from "../../card.model";

export abstract class BaseCardComponent {

  @Input() cardId: string;
  @Input() last?: boolean;
  @ViewChild('cardTarget', {read: ViewContainerRef}) target: any;
  cardRef: ComponentRef<any>;
  card: Card;
  failed = false;
  hidden = false;
  loadedObs: EventEmitter<any> = new EventEmitter<any>();
}
