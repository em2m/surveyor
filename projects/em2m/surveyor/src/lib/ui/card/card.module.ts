import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CardService} from "./card.service";
import {CardComponent} from "./card.component";
import {CardBoardComponent} from "./card-board.component";
import {CardBoardPage} from "./card-board.page";
import {HtmlCardComponent} from "./renderers/card/html/html-card.component";
import {StackCardComponent} from "./renderers/card/stack/stack-card.component";
import {StandardCardComponent} from "./renderers/card/standard/standard-card.component";
import {StackCardBoardRenderer} from "./renderers/cardboard/stack/stack-card-board.component";
import {StandardCardBoardRenderer} from "./renderers/cardboard/standard/standard-card-board.component";
import {CardPlugin} from "./card-plugin";
import {AccordionCardBoardRenderer} from "./renderers/cardboard/accordion/accordion-card-board.component";
import {CollapsibleCardComponent} from "./renderers/card/collapsible/collapsible-card.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {GridCardBoardRenderer} from "./renderers/cardboard/grid/grid-card-board.component";
import {PlainCardComponent} from "./renderers/card/plain/plain-card.component";

export * from './card-plugin';
export * from './card.component';
export * from './card.model';
export * from './card.service';
export * from './card-board.component';
export * from './card-board.page';
export * from './renderers/card/base-card.component';
export * from './renderers/card/card.renderer';
export * from './renderers/card/collapsible/collapsible-card.component';
export * from './renderers/card/html/html-card.component';
export * from './renderers/card/stack/stack-card.component';
export * from './renderers/card/standard/standard-card.component';
export * from './renderers/card/plain/plain-card.component';
export * from './renderers/cardboard/card-board.renderer';
export * from './renderers/cardboard/accordion/accordion-card-board.component';
export * from './renderers/cardboard/grid/grid-card-board.component';
export * from './renderers/cardboard/stack/stack-card-board.component';
export * from './renderers/cardboard/standard/standard-card-board.component';

const components = [
  CardComponent,
  CardBoardComponent,
  CardBoardPage,
  CollapsibleCardComponent,
  HtmlCardComponent,
  StackCardComponent,
  StandardCardComponent,
  PlainCardComponent,
  AccordionCardBoardRenderer,
  StackCardBoardRenderer,
  StandardCardBoardRenderer,
  GridCardBoardRenderer
];

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule
  ],
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ],
  entryComponents: [
    ...components
  ]
})
export class SurveyorCardModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SurveyorCardModule,
      providers: [
        CardService,
        {provide: "PLUGIN", useValue: CardPlugin, multi: true}
      ]
    };
  }
}
