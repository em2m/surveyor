
import {Component} from '@angular/core';
import {Searcher} from '../../shared/searcher.model';
import {Bucket, ExistsQuery, Query, RangeQuery, TermQuery} from '../../shared/query.model';
import {PickerOptions} from '../../../ui/picker/picker.model';
import {PickerService} from '../../../ui/picker/picker.service';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'surveyor-standard-facet',
  templateUrl: './standard-facet.component.html',
  styleUrls: ['./standard-facet.component.scss']
})
export class StandardFacetComponent {

  requestAggs: { [key: string]: any} = {};
  resultOpAggs: { [key: string]: string} = {};
  DAY_IN_MILLIS = 1000 * 60 * 60 * 24;

  constructor(public searcher: Searcher,
              private pickerService: PickerService) {}

  showMoreAggs(agg) {
    this.pickerService.pick('term-picker', <PickerOptions> {
      title: 'Select a value',
      params: {
        agg: agg,
        buckets: this.searcher.searchResult.aggs[agg.key].buckets
      }
    }).subscribe((item: any) => {
      if (item && item.agg) {
        this.addConstraint(item.agg, item.bucket);
      }
    });
  }

  hasBuckets(key: string): boolean {
    return this.bucketsForAgg(key).length > 0;
  }

  bucketLength(key: string): number {
    let bucketLength = 0;
    if (this.searcher.searchResult && this.searcher.searchResult.aggs && this.searcher.searchResult.aggs[key]) {
      bucketLength = this.searcher.searchResult.aggs[key].buckets.length;
    }
    return bucketLength;
  }

  bucketsForAgg(key: string): Array<Bucket> {
    if (this.searcher.searchResult && this.searcher.searchResult.aggs && this.searcher.searchResult.aggs[key]) {
      const aggs = this.searcher.aggs.filter(agg => agg.key === key)[0];
      this.requestAggs[key] = aggs;
      this.resultOpAggs[key] = this.searcher.searchResult.aggs[key].op;
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

  addConstraint(agg: any, bucket: any) {
    const key = bucket.key;
    const op = this.resultOpAggs[agg.field] || agg.op;
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
    if (op === 'range' || op === 'date_range') {
      const lt = bucket.to;
      const gte = bucket.from;
      query = new RangeQuery(agg.field, lt, null, null, gte, null);
    }
    this.searcher.addConstraint({
      label: `${agg.label || agg.key} : ${bucket.label || bucket.key}`,
      query: query
    });
    this.searcher.broadcastRequest();
  }

  isRangeAgg(agg: any): boolean {
    return (this.resultOpAggs[agg.field] || agg.op) === 'date_range';
  }

  loadDatePicker(agg: any) {
    this.pickerService.pick('date-range', { title: 'Select Date Range' }).subscribe(range => {
      if (range) {
        const from = range.from.getTime();
        const to = range.to.getTime() + this.DAY_IN_MILLIS - 1;
        const query = new RangeQuery(agg.field, to, null, null, from, null);

        this.searcher.addConstraint({
          label: `${agg.label || agg.key} : ${moment(from).format('LL')} to ${moment(to).format('LL')}`,
          query: query
        });
        this.searcher.broadcastRequest();
      }
    });
  }
}
