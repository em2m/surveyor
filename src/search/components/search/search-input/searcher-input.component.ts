import {Component, Input, OnInit} from "@angular/core";
import {SearchConstraint, Searcher, SearchRequest} from "../../../shared/searcher.model";
import {PickerService} from "../../../../ui/picker/picker.service";
import {BoolQuery, LuceneQuery, MatchQuery, OperationType, Query, RegexQuery} from "../../../shared/query.model";

@Component({
  selector: 'surveyor-searcher-input',
  templateUrl: './searcher-input.component.html',
  styleUrls: ['./searcher-input.component.scss']
})
export class SearcherInputComponent implements OnInit {

  @Input() iconRegion = "icon-region";
  @Input() searcher: Searcher;
  @Input() placeholder = "Search ...";
  public searchInput = '';
  public constraints: Array<any> = [];

  constructor(private pickerService: PickerService) {
  }

  ngOnInit() {
    if (this.searcher) {
      this.searcher.whenRequestPublished.subscribe((request: SearchRequest) => {
        this.onQuery(request.query);
      });
    }
  }

  onSubmit(searchInput: string) {
    if (searchInput && searchInput.trim().length > 0) {
      const constraint = <SearchConstraint>{
        label: searchInput
      };

      if (searchInput.indexOf(":") > -1 || searchInput.indexOf("(") > -1 || searchInput.indexOf("*") > -1) {
        constraint.query = new LuceneQuery(searchInput, "_all");
      } else {
        const queries = new Array<Query>();
        let tokenizedSearchInput = searchInput.split(" ");
        this.searcher.fullTextFields.forEach(field => {
          tokenizedSearchInput.forEach(queryString => {
            queries.push(new LuceneQuery(`${field}:*${queryString}*`, field));
          })
        });
        constraint.query = new BoolQuery(OperationType.AND, queries);
      }

      this.searcher.constraints.push(constraint);
      this.searcher.broadcastRequest();
    }
    this.searchInput = '';
  }

  onQuery(query: Query) {
    const constraints: Array<any> = [];
    for (let i = 0; i < this.searcher.constraints.length; i++) {
      const constraint = this.searcher.constraints[i];

      if (constraint) {
        constraints.push({
          key: i,
          text: constraint.label,
          not: constraint.not,
          type: constraint.type
        });
      }
    }
    this.constraints = constraints;
  }

  removeConstraint(constraint: any) {
    this.searcher.constraints.splice(constraint.key, 1);
    this.searcher.broadcastRequest();
  }

  clickConstraint(constraint: any) {
    if (constraint.type !== "picker") {
      this.searcher.constraints[constraint.key].not = !this.searcher.constraints[constraint.key].not;
      this.searcher.broadcastRequest();
    } else {
      const pickerOptions = this.searcher.pickerOptions;
      pickerOptions.params["query"] = this.searcher.constraints[constraint.key].query;

      this.pickerService.pick("query", this.searcher.pickerOptions).subscribe((searchConstraint) => {
        if (searchConstraint) {
          this.searcher.constraints[constraint.key] = searchConstraint;
          this.searcher.broadcastRequest();
        }
      });
    }
  }
}
