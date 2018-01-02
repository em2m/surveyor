import {Component, ComponentFactoryResolver, OnInit} from "@angular/core";
import {CardService} from "../../../card.service";
import {BaseCardComponent} from "../base-card.component";

@Component({
  selector: 'surveyor-stack-card',
  templateUrl: './stack-card.component.html',
  styleUrls: ['./stack-card.component.scss']
})
export class StackCardComponent extends BaseCardComponent implements OnInit {

  constructor(private resolver: ComponentFactoryResolver, private cardService: CardService) {
    super();
  }

  ngOnInit() {
    if (this.cardRef == null) {
      this.loadCard();
    }
  }

  loadCard() {
    let cardType = this.cardService.getCardComponent(this.cardId);
    if (!cardType) {
      this.failed = true;
    } else {
      let factory = this.resolver.resolveComponentFactory(cardType);
      this.hidden = false;
      this.cardRef = this.target.createComponent(factory);
      this.cardRef.instance.id = this.cardId;
      this.card = this.cardRef.instance;

      if (this.card.hide) {
        this.card.hide.subscribe(res => { this.hidden = res.hidden; });
      }

      let cardConfig = this.cardService.getCardConfig(this.cardId);
      if (cardConfig.name !== undefined) { this.card.name = cardConfig.name; }
      if (cardConfig.category !== undefined) { this.card.category = cardConfig.category; }
      if (cardConfig.title !== undefined) { this.card.title = cardConfig.title; }
      if (cardConfig.priority !== undefined) { this.card.priority = cardConfig.priority; }
      if (cardConfig.actionGroup !== undefined) { this.card.actionGroup = cardConfig.actionGroup; }
      if (cardConfig.iconClass !== undefined) { this.card.iconClass = cardConfig.iconClass; }
      if (cardConfig.gridWidth !== undefined) { this.card.gridWidth = cardConfig.gridWidth; }
      if (cardConfig.style !== undefined) { this.card.style = cardConfig.style; }
      if (cardConfig.config !== undefined) { this.card.config = cardConfig.config; }

      this.loadedObs.emit(this.cardRef.instance);
    }
  }

}
