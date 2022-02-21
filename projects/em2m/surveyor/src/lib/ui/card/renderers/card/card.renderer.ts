import { Input, Directive } from '@angular/core';

@Directive()
export abstract class CardRenderer {

  @Input() cardId: string;
  @Input() last?: boolean;
}
