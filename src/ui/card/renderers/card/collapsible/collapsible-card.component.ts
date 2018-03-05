import {Component, ComponentFactoryResolver, Input, OnInit} from "@angular/core";
import {CardService} from "../../../card.service";
import {BaseCardComponent} from "../base-card.component";

@Component({
  selector: 'surveyor-collapsible-card',
  templateUrl: './collapsible-card.component.html',
  styleUrls: ['./collapsible-card.component.scss']
})
export class CollapsibleCardComponent extends BaseCardComponent implements OnInit {

  @Input() collapsed? = false;

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
      this.cardRef = this.target.createComponent(factory);
      this.cardRef.instance.id = this.cardId;
      this.card = this.cardRef.instance;

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

  collapse() {
    this.collapsed = !this.collapsed;
  }
}
