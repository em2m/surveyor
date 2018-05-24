import {Component, ComponentFactoryResolver, Input, OnInit} from "@angular/core";
import {CardService} from "../../../card.service";
import {BaseCardComponent} from "../base-card.component";

@Component({
  selector: 'surveyor-collapsible-card',
  templateUrl: './collapsible-card.component.html',
  styleUrls: ['./collapsible-card.component.scss']
})
export class CollapsibleCardComponent extends BaseCardComponent implements OnInit {

  @Input() collapsed = false;

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
      if (cardConfig.title !== undefined) { this.card.title = cardConfig.title; }
      if (cardConfig.style !== undefined) { this.card.style = cardConfig.style; }

      this.loadedObs.emit(this.cardRef.instance);
    }
  }

  collapse() {
    this.collapsed = !this.collapsed;
  }
}
