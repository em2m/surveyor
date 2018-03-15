import {
  Component, Input, ComponentFactoryResolver, EventEmitter, Output, ViewChild, ViewContainerRef, OnInit, OnChanges, OnDestroy
} from "@angular/core";
import {CardService} from "./card.service";
import {FilterContext} from "../../core/extension/extension.model";

@Component({
  selector: 'surveyor-card-board',
  template: '<div [hidden]="hidden"><div #cardBoardTarget></div></div>',
})
export class CardBoardComponent implements OnInit, OnChanges, OnDestroy {

  @Input() target: string;
  @Input() type? = 'standard';
  @Input() title?: string;
  @Input() collapsed = false;
  @Output() isHidden: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('cardBoardTarget', {read: ViewContainerRef}) cardBoardTarget: any;
  cardsHidden: Map<string, boolean> = new Map<string, boolean>();
  hidden = false;

  private cardBoardRef: any;

  constructor(private resolver: ComponentFactoryResolver, private cardService: CardService) {
  }

  ngOnInit() {
    this.loadCardBoard();
  }

  ngOnChanges() {
    this.loadCardBoard();
  }

  ngOnDestroy() {
    this.destroyCardBoard();
  }

  private loadCardBoard() {
    this.destroyCardBoard();

    let renderer = this.cardService.resolveCardBoardRenderer(this.type);
    if (renderer != null) {
      let factory = this.resolver.resolveComponentFactory(renderer);

      let cardBoardRef = this.cardBoardTarget.createComponent(factory);
      cardBoardRef.instance.target = this.target;
      cardBoardRef.instance.title = this.title;
      cardBoardRef.instance.collapsed = this.collapsed;
      this.cardBoardRef = cardBoardRef;

      // subscribe to list of cards created inside cardboard
      this.cardBoardRef.instance.cardObs.subscribe(card => {
        if (card.id) {
          this.cardsHidden[card.id] = false;
        }
        if (card.hide) {
          card.hide.subscribe(hidden => {
            this.cardsHidden[card.id] = hidden;
            this.hidden = true;
            for (let key in this.cardsHidden) {
              if (this.cardsHidden.hasOwnProperty(key)) {
                this.hidden = this.hidden && this.cardsHidden[key];
              }
            }
            this.isHidden.emit(this.hidden);
          });
        }
      });

    } else {
      console.error("Unable to locate card board renderer: Type = " + this.type);
    }
  }

  private destroyCardBoard() {
    if (this.cardBoardRef) {
      this.cardBoardRef.destroy();
      this.cardBoardRef = null;
    }
  }
}
