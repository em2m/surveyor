import {Component, EventEmitter, Output, OnInit, OnChanges} from '@angular/core';
import {CardService} from '../../../card.service';
import {CardBoardRenderer} from '../card-board.renderer';

@Component({
  selector: 'surveyor-accordion-card-board',
  templateUrl: './accordion-card-board.component.html',
  styleUrls: ['./accordion-card-board.component.scss']
})
export class AccordionCardBoardRenderer extends CardBoardRenderer implements OnInit, OnChanges {

  @Output() visible = new EventEmitter();

  constructor(private cardService: CardService) {
    super();
  }

  ngOnInit() {
    this.updateCards();
  }

  ngOnChanges() {
    this.updateCards();
  }

  updateCards() {
    this.cards = this.cardService.findCards(this.target);
  }

  created(card) {
    this.cardObs.next(card);
  }
}
