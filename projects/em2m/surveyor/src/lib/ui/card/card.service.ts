import {Injectable, Type} from '@angular/core';
import {Card} from './card.model';
import {CardBoardRenderer} from './renderers/cardboard/card-board.renderer';
import {CardRenderer} from './renderers/card/card.renderer';
import {ExtensionService} from '../../core/extension/extension.service';
import {Extension} from '../../core/extension/extension.model';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs';

@Injectable()
export class CardService {

  private CARD_EXTENSION_TYPE = 'surveyor:card';
  private CARD_RENDERER_EXTENSION_TYPE = 'surveyor:card-renderer';
  private CARD_BOARD_RENDERER_EXTENSION_TYPE = 'surveyor:card-board-renderer';

  private cardRenderers: {[type: string]: Type<CardRenderer>} = {};
  private cardBoardRenderers: {[type: string]: Type<CardBoardRenderer>} = {};
  private cardboardSource = new Subject<string>();
  private cardboardObservable: Observable<string> = this.cardboardSource.asObservable();

  constructor(private extensionService: ExtensionService) {
    this.registerRenderers();
  }

  getCardComponent(cardId: string): Type<Card> {
    const extension = this.extensionService.getExtensionById(this.CARD_EXTENSION_TYPE, cardId);
    if (extension) {
      return extension.value;
    } else {
      return null;
    }
  }

  getCardConfig(cardId: string): Card {
    const extension = this.extensionService.getExtensionById(this.CARD_EXTENSION_TYPE, cardId);
    if (extension) {
      return extension.config;
    } else {
      return null;
    }
  }

  findCards(target: string): Array<Card> {
    const results = [];
    this.extensionService.getExtensionsForTypeAndTarget(this.CARD_EXTENSION_TYPE, target)
      .forEach((extension: Extension) => {
          results.push(extension.config);
        }
      );
    return results;
  }

  resolveCardRenderer(type: string): Type<CardRenderer> {
    return this.cardRenderers[type];
  }

  resolveCardBoardRenderer(type: string): Type<CardBoardRenderer> {
    return this.cardBoardRenderers[type];
  }

  hideCardboard(cardboardId: string) {
    this.cardboardSource.next(cardboardId);
  }

  watchCardboards(): Observable<string> {
    return this.cardboardObservable;
  }

  private registerRenderers() {
    this.extensionService.getExtensionsForType(this.CARD_RENDERER_EXTENSION_TYPE).forEach((extension: Extension) => {
      const rendererType = extension.config.type;
      if (rendererType) {
        this.cardRenderers[rendererType] = extension.value;
      }
    });

    this.extensionService.getExtensionsForType(this.CARD_BOARD_RENDERER_EXTENSION_TYPE).forEach((extension: Extension) => {
      const rendererType = extension.config.type;
      if (rendererType) {
        this.cardBoardRenderers[rendererType] = extension.value;
      }
    });
  }
}
