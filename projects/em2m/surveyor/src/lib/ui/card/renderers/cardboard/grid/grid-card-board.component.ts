import {Component, EventEmitter, OnChanges, OnInit, Output} from '@angular/core';
import {CardService} from '../../../card.service';
import {Card} from '../../../card.model';
import {CardBoardRenderer} from '../card-board.renderer';

@Component({
  selector: 'surveyor-grid-card-board',
  templateUrl: './grid-card-board.component.html',
  styleUrls: ['./grid-card-board.component.scss']
})
export class GridCardBoardRenderer extends CardBoardRenderer implements OnInit, OnChanges {

  @Output() visible = new EventEmitter();

  public cards: Array<Card> = [];

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
