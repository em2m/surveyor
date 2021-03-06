import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchConstraint, Searcher} from '../../shared/searcher.model';
import {Bucket, DateRangeQuery, ExistsQuery, OrQuery, Query, RangeQuery, TermQuery} from '../../shared/query.model';
import {PickerService} from '../../../ui/picker/picker.service';
import * as _moment from 'moment';
import {Subscription} from 'rxjs';

const moment = _moment;

@Component({
  selector: 'surveyor-standard-facet',
  templateUrl: './standard-facet.component.html',
  styleUrls: ['./standard-facet.component.scss']
})
export class StandardFacetComponent implements OnInit, OnDestroy {

  requestAggs: { [key: string]: any } = {};
  resultOpAggs: { [key: string]: string } = {};
  resultTypeAggs: { [key: string]: string } = {};
  DAY_IN_MILLIS = 1000 * 60 * 60 * 24;
  moreSubscription: Subscription;

  constructor(public searcher: Searcher,
              private pickerService: PickerService) {
  }

  ngOnInit(): void {
    this.moreSubscription = this.searcher.whenMoreResultPublished.subscribe(item => {
      // loop through constraint list
      let constraintAlreadyExists = false;
      this.searcher.constraints.forEach(constraint => {
        if (item && item.agg && (constraint.key === item.agg.label || constraint.key === item.agg.key)) {
          constraintAlreadyExists = true;
        }
      });

      if (constraintAlreadyExists && item && item.agg) {
        this.searcher.constraints = this.searcher.constraints.filter(constraint => {
          return constraint.key !== `${item.agg.label || item.agg.key}`;
        });
      }

      if (item && item.agg) {
        this.addConstraint(item.agg, item.bucket);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.moreSubscription) {
      this.searcher.moreResult = null;
      this.searcher.moreRequest = null;
      this.moreSubscription.unsubscribe();
    }
  }

  showMoreAggs(agg) {
    const constraintRemovedAgg = JSON.parse(JSON.stringify(agg));
    constraintRemovedAgg.query = {op: 'all'};
    this.searcher.moreRequest = constraintRemovedAgg;
  }

  hasBuckets(key: string): boolean {
    return this.bucketsForAgg(key).length > 0;
  }

  showMultiChoice(agg: any, bucket: any) {

    let multiSelected = false;
    this.searcher.constraints.forEach(constraint => {
      if (agg && (constraint.key === agg.label || constraint.key === agg.key)) {
        multiSelected = true;
      }
    });
    const multipleBuckets = bucket.length > 1;
    const op = this.getAggOp(agg);
    return (multiSelected || op === 'terms' || op === 'filters' || op === 'date_range') && multipleBuckets;
  }

  bucketsForAgg(key: string): Array<Bucket> {
    if (this.searcher.searchResult && this.searcher.searchResult.aggs && this.searcher.searchResult.aggs[key]) {
      const aggs = this.searcher.aggs.filter(agg => agg.key === key)[0];
      this.requestAggs[key] = aggs;
      this.resultOpAggs[key] = this.searcher.searchResult.aggs[key].op;
      this.resultTypeAggs[key] = this.searcher.searchResult.aggs[key].type;
      const buckets = aggs.size ? this.searcher.searchResult.aggs[key].buckets.slice(0, aggs.size) :
        this.searcher.searchResult.aggs[key].buckets;

      if (this.searcher.aggsMapper && this.searcher.aggsMapper[key]) {
        buckets.forEach(item => {
          item.label = this.searcher.aggsMapper[key][item.key];
        });
      }
      return buckets;
    }
    return [];
  }

  private getAggType(agg: any) {
    return this.resultTypeAggs[agg.key];
  }

  addConstraint(agg: any, bucket: any) {
    if (Array.isArray(bucket)) {
      const queries = [];
      const values = [];
      const buckets = [];
      bucket.forEach(b => {
        const query = this.buildBucketQuery(agg, b);
        queries.push(query);
        values.push(b.key);
        buckets.push(b);
      });
      const aggLabel = values.length > 1 ? 'Multiple' : values[0];
      this.searcher.addConstraint({
        label: `${agg.label || agg.key} : ${aggLabel}`,
        query: new OrQuery(queries),
        key: `${agg.label || agg.key}`,
        values,
        buckets
      } as any);
    } else {
      const query = this.buildBucketQuery(agg, bucket);
      this.searcher.addConstraint({
        label: `${agg.label || agg.key} : ${bucket.label || bucket.key}`,
        query,
        values: [bucket.key]
      });
    }
    this.searcher.broadcastRequest();
  }

  private getAggOp(agg: any) {
    return this.resultOpAggs[agg.field] || agg.op;
  }

  private buildBucketQuery(agg: any, bucket: any): Query {
    const op = this.getAggOp(agg);
    const key = bucket.key;
    let query: Query = new TermQuery(agg.field, key);
    if (typeof key === 'string' && key.toLowerCase() === 'missing') {
      query = new ExistsQuery(agg.key, false);
    }
    if (op === 'missing') {
      query = new ExistsQuery(agg.key, true);
    }
    if (op === 'filters') {
      query = bucket.query || agg.filters[key];
    }
    if (op === 'range') {
      const lt = bucket.to;
      const gte = bucket.from;
      query = new RangeQuery(agg.field, lt, null, null, gte, null);
    }
    if (op === 'date_range') {
      const lt = bucket.to;
      const gte = bucket.from;
      query = new DateRangeQuery(agg.field, lt, null, null, gte, null);
    }
    return query;
  }

  isRangeAgg(agg: any): boolean {
    return this.getAggType(agg) === 'date' || this.getAggOp(agg) === 'date_range';
  }

  loadDatePicker(agg: any) {
    this.pickerService.pick('date-range', {title: 'Select Date Range'}).subscribe(range => {
      if (range) {
        const from = range.from.getTime();
        const to = range.to.getTime() + this.DAY_IN_MILLIS - 1;
        const query = new RangeQuery(agg.field, to, null, null, from, null);

        this.searcher.addConstraint({
          label: `${agg.label || agg.key} : ${moment(from).format('LL')} to ${moment(to).format('LL')}`,
          query
        });
        this.searcher.broadcastRequest();
      }
    });
  }
}
