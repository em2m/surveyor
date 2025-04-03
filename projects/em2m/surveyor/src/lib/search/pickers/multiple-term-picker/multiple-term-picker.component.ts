import {Component, OnInit} from '@angular/core';
import {Picker} from '../../../ui/picker/picker.component';
import {SearchConstraint} from '../../shared/searcher.model';
import {Surveyori18nService} from "../../../ui/i18n/shared/i18n.service";

@Component({
  selector: 'surveyor-multiple-term-picker',
  templateUrl: './multiple-term-picker.component.html',
  styleUrls: ['./multiple-term-picker.component.scss']
})
export class MultipleTermPickerComponent extends Picker implements OnInit {

  searchText = '';
  clearVisible = false;
  buckets: Array<any> = [];
  constraints: Array<any> = [];
  bucketSearchResults: Array<any> = [];
  selectedItems: { [key: string]: any} = {};
  itemExists: { [key: string]: any} = {};

  key = '';
  agg: any;
  label = '';
  submitEnabled = false;

  constructor(public i18nService: Surveyori18nService) {
    super();
  }


  submit() {
    this.buckets.forEach(bucket => {
      bucket.checked = this.selectedItems[bucket.key];
    });
    const results = this.buckets.filter(bucket => bucket.checked);
    this.pick({
      agg: this.agg,
      bucket: results.length > 1 ? results : results[0]
    });
  }

  canSubmit(): boolean {
    return this.submitEnabled;
  }
  ngOnInit() {
    this.buckets = this.params.buckets;
    this.buckets = this.buckets.filter(bucket => bucket.label || bucket.key);
    this.agg = this.params.agg;
    this.constraints = this.params.constraints;
    this.key = this.agg.key;
    this.label = this.agg.label;

    this.bucketSearchResults = this.buckets.map(bucketItem => {
      bucketItem.checked = false;
      return bucketItem;
    });

    const constraint = this.constraints.filter((con: SearchConstraint) => {
      return con.key === `${this.agg.key}` || con.key === `${this.agg.label}`;
    });

    if (constraint.length) {
      (constraint[0] as SearchConstraint)?.buckets?.forEach(bucket => {
        let exists = false;
        this.bucketSearchResults.forEach(bucketItem => {
          if (bucket.key === bucketItem.key) {
            bucketItem.checked = true;
            this.selectedItems[bucket.key] = true;
            exists = true;
          }
        });

        if (!exists) {
          bucket.checked = true;
          bucket.count = 0;
          this.buckets.push(bucket);
          this.bucketSearchResults.push(bucket);
          this.selectedItems[bucket.key] = true;
        }
      });
    }

    // resort
    if (this.agg.sort?.type === 'Lexical' && this.agg.sort.direction === 'Descending') {
      this.buckets.sort(sortDescending);
      this.bucketSearchResults.sort(sortDescending);
    } else if (this.agg.sort?.type === 'Lexical' && this.agg.sort.direction === 'Ascending') {
      this.buckets.sort(sortAscending);
      this.bucketSearchResults.sort(sortAscending);
    } else if (this.agg.sort?.direction === 'Descending') {
      this.buckets.sort(sortDescending);
      this.bucketSearchResults.sort(sortDescending);
    } else if (this.agg.sort?.direction === 'Ascending') {
      this.buckets.sort(sortAscending);
      this.bucketSearchResults.sort(sortAscending);
    } else {
      this.buckets.sort(sortCountsDescending);
      this.bucketSearchResults.sort(sortCountsDescending);
    }

    this.bucketSearchResults.sort(sortByChecked);
    this.buckets.sort(sortByChecked);

  }

  toggleBox(item: any): void {
    this.selectedItems[item.key] = item.checked;

    const keys = Object.keys(this.selectedItems);

    for (const key in keys) {
      if (this.selectedItems[keys[key]] === true) {
        this.submitEnabled = true;
        return;
      }
    }
    this.submitEnabled = false;
  }

  clearSearch() {
    this.searchText = '';
    this.search();
  }

  search() {
    this.clearVisible = !(this.searchText === '');
    const regex = this.searchText.toUpperCase().replace(' ', '');
    this.bucketSearchResults = this.buckets.filter(bucket => {
      const {label, key } = bucket;
      const arg = label ? label : key;
      return !!(arg.toUpperCase().replace('_', '').match(regex));
    });
    this.bucketSearchResults.forEach(bucket => {
      bucket.checked = this.selectedItems[bucket.key];
    });
    this.bucketSearchResults.sort(sortByChecked);
    this.buckets.sort(sortByChecked);
  }
}

function sortByChecked(a, b) {
  const x = a.checked ? 1 : 0;
  const y = b.checked ? 1 : 0;
  if (x > y) { return -1; }
  if (x < y) { return 1; }
  return 0;
}

function sortCountsDescending(a, b) { return b.count - a.count; }

function sortDescending(a, b)  {
  const x = a.key.toLowerCase();
  const y = b.key.toLowerCase();
  if (x > y) {return -1; }
  if (x < y) {return 1; }
  return 0;
}

function sortAscending(a, b)  {
  const x = a.key.toLowerCase();
  const y = b.key.toLowerCase();
  if (x < y) {return -1; }
  if (x > y) {return 1; }
  return 0;
}
