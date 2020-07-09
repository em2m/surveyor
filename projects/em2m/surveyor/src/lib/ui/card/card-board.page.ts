import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CardService} from './card.service';

@Component({
  selector: 'surveyor-card-board-page',
  template: `
    <surveyor-card-board *ngIf="cardboardId && !hidden" [target]="cardboardId"
                         (isHidden)="hidePage($event)" [type]="cardboardType || 'standard'"></surveyor-card-board>
    <div *ngIf="hidden" style="margin-left: auto; margin-right: auto; padding-top: 4rem; width: 300px;">
      <h5>No cards available</h5>
    </div>
  `
})
export class CardBoardPage implements OnInit {

  cardboardId: string;
  cardboardType?: string;
  hidden = false;

  constructor(private route: ActivatedRoute,
              private cardService: CardService) {
  }

  ngOnInit() {
    this.updateBoard();
  }

  updateBoard() {
    this.route.data.subscribe((data: any) => {
      this.cardboardId = data['cardboardId'];
      this.cardboardType = data['cardboardType'];
    });
  }

  hidePage(event) {
    this.hidden = event;
    if (this.hidden) {
      this.cardService.hideCardboard(this.cardboardId);
    }
  }
}
