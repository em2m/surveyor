import {Component, OnInit} from '@angular/core';
import {Picker} from '../../../ui/picker/picker.component';

@Component({
  selector: 'surveyor-term-picker',
  templateUrl: './term-picker.component.html',
  styleUrls: ['./term-picker.component.scss']
})
export class TermPickerComponent extends Picker implements OnInit {

  selectedItem: any = null;
  searchText = '';
  clearVisible = false;
  buckets: Array<any> = [];
  bucketSearchResults: Array<any> = [];
  key = '';
  agg: any;

  select(item: any) {
    this.selectedItem = item;
    this.pick({
      agg: this.agg,
      bucket: this.selectedItem
    });
  }

  submit() {
    this.pick({
      agg: this.agg,
      bucket: this.selectedItem
    });
  }

  ngOnInit() {
    this.buckets = this.params.buckets;
    this.agg = this.params.agg;
    this.key = this.agg.key;
    this.bucketSearchResults = this.buckets;
    // console.log(this.buckets);
  }

  clearSearch() {
    this.searchText = '';
    this.search();
  }

  search() {
    this.clearVisible = !(this.searchText === '');
    let regex = this.searchText.toUpperCase().replace(' ', '');
    this.bucketSearchResults = this.buckets.filter(bucket => {
      return !!(bucket.key.toUpperCase().replace('_', '').match(regex));
    });
  }
}
