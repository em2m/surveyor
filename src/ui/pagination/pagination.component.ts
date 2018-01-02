import {Component, Input, EventEmitter, OnChanges, OnInit, Output} from "@angular/core";

@Component({
  selector: 'surveyor-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() currentPage: number;
  @Input() pageSize: number;
  @Input() totalItems: number;
  @Input() maxSize = 5;
  @Input() showFirst = true;
  @Input() showLast = true;
  @Input() showIcons = false;
  @Output() pageChanged = new EventEmitter();
  firstPage: number;
  prevPage: number;
  pages: Array<number> = [];
  nextPage: number;
  lastPage: number;

  constructor() {
  }

  ngOnInit() {
    this.refreshPages();
  }

  ngOnChanges() {
    this.refreshPages();
  }

  refreshPages() {
    if (this.totalItems) {
      let first = 1;
      let last = Math.ceil(this.totalItems / this.pageSize);

      let start = this.currentPage - (Math.floor(this.maxSize / 2));
      if (start < first) {
        start = first;
      }
      let end = start + (this.maxSize - 1);
      if (end > last) {
        end = last;

        start = end - (this.maxSize - 1);
        if (start < first) {
          start = first;
        }
      }

      let prev = this.currentPage - 1;
      if (prev < first) {
        prev = first;
      }
      let next = this.currentPage + 1;
      if (next > last) {
        next = last;
      }

      this.firstPage = null;
      this.prevPage = null;
      this.nextPage = null;
      this.lastPage = null;

      if (first !== this.currentPage) this.firstPage = first;
      if (prev !== this.currentPage) this.prevPage = prev;
      if (next !== this.currentPage) this.nextPage = next;
      if (last !== this.currentPage) this.lastPage = last;

      this.pages = [];
      for (let i = start; i <= end; i++) {
        this.pages.push(i);
      }
    }
  }

  selectPage(pageNum: number) {
    this.pageChanged.emit(pageNum);
  }
}
