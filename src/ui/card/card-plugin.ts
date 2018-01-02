import {Plugin} from "../../core/extension/extension.model";
import {StandardCardComponent} from "./renderers/card/standard/standard-card.component";
import {StackCardComponent} from "./renderers/card/stack/stack-card.component";
import {StandardCardBoardRenderer} from "./renderers/cardboard/standard/standard-card-board.component";
import {StackCardBoardRenderer} from "./renderers/cardboard/stack/stack-card-board.component";

export let CardPlugin: Plugin = <Plugin> {
  name: "Card Plugin",
  extensions: {
    "surveyor:card-renderer": [
      {value: StandardCardComponent, config: {type: "standard"}},
      {value: StackCardComponent, config: {type: "stack"}}
    ],
    "surveyor:card-board-renderer": [
      {value: StandardCardBoardRenderer, config: {type: "standard"}},
      {value: StackCardBoardRenderer, config: {type: "stack"}}
    ]
  }
};
