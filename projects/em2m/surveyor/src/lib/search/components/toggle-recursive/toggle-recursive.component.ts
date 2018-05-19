import {Searcher} from '../../shared/searcher.model';
import {Component} from '@angular/core';

@Component({
  selector: 'surveyor-toggle-recursive',
  templateUrl: './toggle-recursive.component.html'
})
export class ToggleRecursiveComponent {
  constructor(public searcher: Searcher) {}

  toggleRecursive() {
    this.searcher.recursive = !this.searcher.recursive;
    this.searcher.broadcastRequest();
  }
}
