import { Input, Output, Directive } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Card} from '../../card.model';

@Directive()
export abstract class CardBoardRenderer {

  @Input() target: string;
  @Input() title?: string;
  @Input() collapsed ? = false;
  @Output() cardObs: BehaviorSubject<any> = new BehaviorSubject<any>(1);
  cards: Array<Card>;

  constructor() {}
}
