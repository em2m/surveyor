import {Searcher} from '../../shared/searcher.model';
import {Component, Input} from '@angular/core';

@Component({
  selector: 'surveyor-toggle-archived',
  templateUrl: './toggle-archived.component.html'
})
export class ToggleArchivedComponent {
  @Input() label;
  archived = false;

  constructor(public searcher: Searcher) {
    this.archived = searcher.options && searcher.options.archived ? searcher.options.archived : false;
  }

  toggleArchived() {
    this.searcher.options = this.searcher.options || {};
    this.searcher.options.archived = !this.archived;
    this.archived = !this.archived;
    this.searcher.broadcastRequest();
  }
}
