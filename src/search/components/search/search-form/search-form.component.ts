import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import {FormGroup, FormControl} from "@angular/forms";
import {FilterBase} from "./filter-base";
@Component({
  selector: 'em2m-search-form',
  templateUrl: 'search-form.component.html'
})
export class SearchFormComponent implements OnInit {
  @Input() filters: FilterBase<any>[] = [];
  @Input() placeholder = "Search ...";
  @Output() formChange = new EventEmitter();
  public form: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.form = this.toFormGroup(this.filters);
    this.form.valueChanges.subscribe(event => {
      this.formChange.emit({value: this.form.value});
    });
  }

  toFormGroup(filters: FilterBase<any>[]) {
    let group: any = {};

    group["q"] = new FormControl("");

    filters.forEach(filter => {
      group[filter.key] = filter.toFormGroup();
    });
    return new FormGroup(group);
  }
}
