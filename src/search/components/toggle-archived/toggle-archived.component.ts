import {Searcher} from "../../shared/searcher.model";
import {Component, Input} from "@angular/core";

@Component({
  selector: 'surveyor-toggle-archived',
  templateUrl: './toggle-archived.component.html'
})
export class ToggleArchivedComponent {
  @Input() label;
  constructor(public searcher: Searcher) {}

  toggleArchived() {
    this.searcher.options.archived = !this.searcher.options.archived;
    this.searcher.broadcastRequest();
  }
}
