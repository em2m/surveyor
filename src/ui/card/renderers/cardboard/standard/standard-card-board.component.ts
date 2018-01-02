import {Component, EventEmitter, OnChanges, OnInit, Output} from "@angular/core";
import {CardService} from "../../../card.service";
import {Card} from "../../../card.model";
import {CardBoardRenderer} from "../card-board.renderer";

@Component({
  selector: 'surveyor-standard-card-board',
  templateUrl: './standard-card-board.component.html',
  styleUrls: ['./standard-card-board.component.scss']
})
export class StandardCardBoardRenderer extends CardBoardRenderer implements OnInit, OnChanges {

  @Output() visible = new EventEmitter();

  public cardRows: Array<Array<Card>> = [];

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
    let cardRows = [];

    let cards = this.cardService.findCards(this.target).reverse();

    while (cards.length > 0) {
      let cardRow = [];

      let rowFilled = false;
      let rowSize = 0;

      // Iterate over all the cards to make bes fit rows maintaining perfect order
      while (!rowFilled && cards.length > 0) {
        let card = cards.pop();
        card.gridWidth = card.gridWidth || 12;
        if (rowSize + card.gridWidth <= 12) {
          cardRow.push(card);
          rowSize += card.gridWidth;
        } else {
          // Put the card back in the list since it was too big for the row
          cards.push(card);
          rowFilled = true;
        }
      }

      cardRows.push(cardRow);
    }
    this.cardRows = cardRows;
  }

  created(card) {
    this.cardObs.next(card);
  }

}
