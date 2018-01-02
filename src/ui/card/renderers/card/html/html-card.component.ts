import {Component} from "@angular/core";
import {BaseCardComponent} from "../base-card.component";

@Component({
  selector: 'surveyor-html-card',
  template: '<div [innerHtml]="card.config?.content"></div>'
})
export class HtmlCardComponent extends BaseCardComponent {
}
