import {Component, EventEmitter, Output, OnInit, OnChanges} from "@angular/core";
import {CardService} from "../../../card.service";
import {CardBoardRenderer} from "../card-board.renderer";

@Component({
  selector: 'surveyor-stack-card-board',
  templateUrl: './stack-card-board.component.html',
  styleUrls: ['./stack-card-board.component.scss']
})
export class StackCardBoardRenderer extends CardBoardRenderer implements OnInit, OnChanges {

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

  collapse() {
    this.collapsed = !this.collapsed;
  }
}
