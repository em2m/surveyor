
import {Component, Input} from "@angular/core";
import {Searcher} from "../../shared/searcher.model";

@Component({
  templateUrl: './total-results.component.html'
})
export class TotalResultComponent {
  constructor(searcher: Searcher) {}
}
