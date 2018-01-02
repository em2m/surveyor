import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FilterContext} from "../../core/extension/extension.model";
import {CardService} from "./card.service";

@Component({
  selector: 'surveyor-card-board-page',
  template: `
    <surveyor-card-board *ngIf="cardboardId && !hidden" [target]="cardboardId" (isHidden)="hidePage($event)">
    </surveyor-card-board>
    <div *ngIf="hidden" class="mdl-card__title" style="margin-left: auto; margin-right: auto; padding-top: 4rem; width: 300px;">
      <span class="mdl-card__title-text">No cards available</span>
    </div>
  `
})
export class CardBoardPage implements OnInit {

  cardboardId: string;
  filterContext: FilterContext;
  hidden = false;

  constructor(private route: ActivatedRoute,
              private cardService: CardService) {
  }

  ngOnInit() {
    this.updateBoard();
  }

  updateBoard() {
    this.route.data.subscribe((data: any) => {
      this.cardboardId = data["cardboardId"];
    });
  }

  hidePage(event) {
    this.hidden = event;
    if (this.hidden)
      this.cardService.hideCardboard(this.cardboardId);
  }
}
