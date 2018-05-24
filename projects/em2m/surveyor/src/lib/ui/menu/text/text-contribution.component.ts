import {Component, Input, Output, EventEmitter} from "@angular/core";
import {TextMenuContributionConfig} from "./text-contribution.model";
import {MenuContribution} from "../menu.contribution";

@Component({
  selector: 'surveyor-text-menu-contribution',
  templateUrl: './text-contribution.component.html',
})
export class TextMenuContribution implements MenuContribution {

  @Input() config: TextMenuContributionConfig;
  @Output() close: EventEmitter<any> = new EventEmitter();
  text: string;

  constructor() {
  }

  ngOnInit() {
    if (this.config) {
      this.text = this.config.text;
    }
  }
}
