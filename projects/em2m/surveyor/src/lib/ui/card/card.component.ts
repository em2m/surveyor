import {
  Component, Input, ComponentFactoryResolver, EventEmitter, Output, ViewChild, ViewContainerRef, OnInit, OnChanges, OnDestroy
} from "@angular/core";
import {CardService} from "./card.service";
import {Card} from "./card.model";

@Component({
  selector: 'surveyor-card',
  template: `<div [hidden]="hide"><div #cardTarget></div></div>`,
})
export class CardComponent implements OnInit, OnChanges, OnDestroy {

  @Input() cardId: string;
  @Input() type = 'standard';
  @Input() last = false;
  @Output() hidden ?: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() cardCreated ?: EventEmitter<Card> = new EventEmitter<Card>();
  @ViewChild('cardTarget', {read: ViewContainerRef}) cardTarget: any;
  private cardRendererRef: any;
  public hide = false;

  constructor(private resolver: ComponentFactoryResolver, private cardService: CardService) {
  }

  ngOnInit() {
    this.loadCard();
  }

  ngOnChanges() {
    this.loadCard();
  }

  ngOnDestroy() {
    this.destroyCard();
  }

  private loadCard() {
    this.destroyCard();

    let card = this.cardService.getCardConfig(this.cardId);
    if (!card) {
      console.error("Unable to locate card: ID = " + this.cardId);
    } else {
      let cardType = card.type || this.type;

      let renderer = this.cardService.resolveCardRenderer(cardType);
      if (!renderer) {
        console.error("Unable to locate card renderer: Type = " + cardType);
      } else {
        let factory = this.resolver.resolveComponentFactory(renderer);

        let cardRendererRef = this.cardTarget.createComponent(factory);
        cardRendererRef.instance.cardId = this.cardId;
        cardRendererRef.instance.last = this.last;
        this.cardRendererRef = cardRendererRef;

        if (cardRendererRef.instance.loadedObs) {
          cardRendererRef.instance.loadedObs.subscribe(res => {
            this.cardCreated.emit(res);

            if (res.hide) {
              res.hide.subscribe(hidden => {
                this.hide = hidden;
                this.hidden.emit(hidden);
              });
            }
          });
        }
      }
    }
  }

  private destroyCard() {
    if (this.cardRendererRef) {
      this.cardRendererRef.destroy();
      this.cardRendererRef = null;
    }
  }
}
