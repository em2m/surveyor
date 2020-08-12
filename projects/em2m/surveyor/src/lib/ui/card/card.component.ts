import {
  Component,
  Input,
  ComponentFactoryResolver,
  EventEmitter,
  Output,
  ViewChild,
  ViewContainerRef,
  OnInit,
  OnChanges,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import {CardService} from './card.service';
import {Card} from './card.model';

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
  @ViewChild('cardTarget', {read: ViewContainerRef, static: true}) cardTarget: any;
  private cardRendererRef: any;
  public hide = false;

  constructor(private resolver: ComponentFactoryResolver,
              private cardService: CardService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    // this.loadCard();
  }

  ngOnChanges() {
    this.loadCard();
  }

  ngOnDestroy() {
    this.destroyCard();
  }

  private loadCard() {
    this.destroyCard();

    const card = this.cardService.getCardConfig(this.cardId);
    if (!card) {
      console.error('Unable to locate card: ID = ' + this.cardId);
    } else {
      const cardType = card.type || this.type;

      const renderer = this.cardService.resolveCardRenderer(cardType);
      if (!renderer) {
        console.error('Unable to locate card renderer: Type = ' + cardType);
      } else {
        const factory = this.resolver.resolveComponentFactory(renderer);

        const cardRendererRef = this.cardTarget.createComponent(factory);
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
    this.cdr.detectChanges();
  }

  private destroyCard() {
    if (this.cardRendererRef) {
      this.cardRendererRef.destroy();
      this.cardRendererRef = null;
    }
  }
}
