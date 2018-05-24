import {Input} from "@angular/core";

export abstract class CardRenderer {

  @Input() cardId: string;
  @Input() last?: boolean;
}
