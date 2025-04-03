import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchConstraint, Searcher} from '../../shared/searcher.model';
import {Bucket, DateRangeQuery, ExistsQuery, OrQuery, Query, RangeQuery, TermQuery} from '../../shared/query.model';
import {PickerService} from '../../../ui/picker/picker.service';
import {Subscription} from 'rxjs';
import {ContextService} from '../../../core/extension/context.service';
import {Surveyori18nService} from "../../../ui/i18n/shared/i18n.service";

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
              private pickerService: PickerService,
              private ctx: ContextService,
              public i18nService: Surveyori18nService) {
  }

  ngOnInit(): void {
    this.moreSubscription = this.searcher.whenMoreResultPublished.subscribe(item => {
      if (item) {
        // If there is a specific constraint to edit, find it and edit only that constraint
        const multiTermConstraint = this.ctx.getValue('multiTermConstraint') as SearchConstraint;
        if (multiTermConstraint && multiTermConstraint.id) {
          this.searcher.constraints = this.searcher.constraints.filter(constraint => {
            return constraint.id !== multiTermConstraint.id;
          });

          this.ctx.setValue('multiTermConstraint', null);
        } else {
          // loop through constraint list
          let constraintAlreadyExists = false;
          this.searcher.constraints.forEach(constraint => {
            if (item && item.agg && (constraint.key === item.agg.label || constraint.key === item.agg.key)) {
              constraintAlreadyExists = true;
            }
          });

          if (constraintAlreadyExists && item && item.agg) {
            this.searcher.constraints = this.searcher.constraints.filter(constraint => {
              return constraint.key !== `${item.agg.key || item.agg.label}`;
            });
          }
        }

        if (item && item.agg) {
          this.addConstraint(item.agg, item.bucket);
        }
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
      let buckets = aggs.size ? this.searcher.searchResult.aggs[key].buckets.slice(0, aggs.size) :
        this.searcher.searchResult.aggs[key].buckets;
      buckets = buckets.filter(bucket => bucket.key || bucket.label);
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
    // console.log(this.searcher);
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
        key: `${agg.label || agg.key}`,
        label: `${agg.label || agg.key} : ${aggLabel}`,
        type: `multipleTermPicker:${agg.key}`,
        query: new OrQuery(queries),
        values,
        buckets
      } as SearchConstraint);
    } else {
      const query = this.buildBucketQuery(agg, bucket);
      this.searcher.addConstraint({
        key: `${agg.label || agg.key}`,
        label: `${agg.label || agg.key} : ${bucket.label || bucket.key}`,
        type: `multipleTermPicker:${agg.key}`,
        query,
        values: [bucket.key],
        buckets: [bucket]
      } as SearchConstraint);
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
    this.pickerService.pick('date-range', {title: this.i18nService.translate('Select Date Range', 'selectdaterange')}).subscribe(range => {
      if (range) {
        const from = range.from.getTime();
        const to = range.to.getTime() + this.DAY_IN_MILLIS - 1;
        const query = new RangeQuery(agg.field, to, null, null, from, null);

        this.searcher.addConstraint({
          type: `dateRangePicker:${agg.key}`,
          label: `${agg.label || agg.key} : ${new Date(from).toLocaleDateString('en-US')} to ${new Date(to).toLocaleDateString('en-US')}`,
          query,
          values: [from, to]
        });
        this.searcher.broadcastRequest();
      }
    });
  }
}
