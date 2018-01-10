
import {Agg, AndQuery, NotQuery, Query, Sort} from "./query.model";
import {Field} from "./scaleset.model";
import {PickerOptions} from "../../ui/picker/picker.model";
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {SortModel} from "../components/search/sort/sort.model";

export interface SearchRequestFields {
  name?: string;
  label?: string;
  expr?: string;
  settings?: any;
}

export interface SearchRequestSorts {
  field?: string;
  direction: string;
}

export interface SearchResult {
  headers?: any;
  totalItems?: number;
  fields?: Array<string>;
  aggs?: any;
  items?: Array<any>;
  rows?: Array<Array<any>>;
}

export interface SearchRequest {
  offset?: number;
  limit?: number;
  query?: any;
  headers?: any;
  fieldSet?: string;
  fields?: Array<SearchRequestFields>;
  sorts?: Array<SearchRequestSorts>;
  aggs?: Array<any>;
  countTotal?: boolean;
}

export interface SearchSelection {
  key: string;
  label: string;
  query: Query;
}

export interface SearchConstraint {
  label: string;
  query: Query;
  op?: string;
  not?: boolean;
  type?: string;
}

export interface SearcherSettings {
  aggs: Array<Agg>;
  fields: Array<Field>;
  sorts: Array<Sort>;
  pageSize: number;
  fullTextFields: Array<string>;
  recursive: boolean;
  pickerOptions?: PickerOptions;
  filter?: Query;
  sortModel?: SortModel;
}

export class Searcher {
  public aggs: Array<Agg>;
  public sortModel: SortModel;
  public aggsMapper: {[key: string]: any};
  public fields: Array<Field> = [];
  public constraints: Array<SearchConstraint> = [];
  public sorts: Array<Sort> = [];
  public recursive = true;
  public fullTextFields: Array<string>;
  public filter?: Query;
  public pageStart: number;
  public pageEnd: number;
  public pickerOptions: PickerOptions;
  private _pageSize = 50;
  private _currentPage = 1;
  private _searchRequest: SearchRequest = {};
  private _searchResult: SearchResult = {};

  private requestSubject: Subject<SearchRequest> = new BehaviorSubject(this._searchRequest);
  public whenRequestPublished: Observable<SearchRequest> = this.requestSubject.asObservable();

  private resultSubject: Subject<SearchResult> = new BehaviorSubject(this._searchResult);
  public whenResultPublished: Observable<SearchResult> = this.resultSubject.asObservable();

  constructor(settings: SearcherSettings) {
    const searchRequest = <SearchRequest>{};
    this.aggs = settings.aggs;
    this.sorts = settings.sorts;
    this.fields = settings.fields || [];
    this.recursive = settings.recursive;
    this.fullTextFields = settings.fullTextFields;
    this.pageSize = settings.pageSize || 50;
    this.currentPage = 1;
    this.pickerOptions = settings.pickerOptions;
    this.sortModel = settings.sortModel;

    this._searchRequest = searchRequest;
  }

  get searchRequest(): SearchRequest {
    // Build the fields array

    let MAX_AGG_SIZE = 2000;
    this._searchRequest.fields = [];
    this.fields.forEach(field => {
      const request: any = {
        name : field.name,
        label : field.label,
        expr : field.expr,
        settings : field.settings
      };
      this._searchRequest.fields.push(request);
    });

    // Build the query using the supplied constraints
    const queries = [];
    if (this.filter) {
      queries.push(this.filter);
    }
    for (const constraint of this.constraints) {
      if (constraint) {
        if (constraint.not) {
          queries.push(new NotQuery([constraint.query]));
        } else {
          queries.push(constraint.query);
        }
      }
    }
    this._searchRequest.query = new AndQuery(queries);

    this._searchRequest.aggs = JSON.parse(JSON.stringify(this.aggs));
    this._searchRequest.sorts = this.sorts;
    this._searchRequest.limit = this.pageSize;

    this._searchRequest.aggs.forEach(agg => { if (agg.size) {
      agg.size = MAX_AGG_SIZE;
    } });

    return this._searchRequest;
  }

  set searchRequest(searchRequest: SearchRequest) {
    this._searchRequest = searchRequest;

    this.broadcastRequest();
  }

  get searchResult(): SearchResult {
    return this._searchResult;
  }

  set searchResult(searchResult: SearchResult) {
    this._searchResult = searchResult;
    this.pageStart = (this.currentPage - 1) * this.pageSize + 1;
    this.pageEnd = Math.min(this.pageStart + this.pageSize - 1, this.searchResult.totalItems );
    this.broadcastResult();
  }

  get pageSize(): number {
    return this._pageSize;
  }

  set pageSize(pageSize: number)  {
    this._pageSize = pageSize;
    this._searchRequest.limit = pageSize;
  }

  get currentPage(): number {
    return this._currentPage;
  }

  set currentPage(currentPage: number)  {
    this._currentPage = currentPage;
    this._searchRequest.offset = (this.currentPage - 1) * this.pageSize;
  }

  public broadcastRequest() {
    this.requestSubject.next(this._searchRequest);
  }

  public broadcastResult() {
    this.resultSubject.next(this._searchResult);
  }
}





