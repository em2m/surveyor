import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Picker} from '../../picker.component';
import * as momentTz from 'moment-timezone';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'surveyor-time-zone-picker',
  templateUrl: './time-zone-picker.component.html',
  styleUrls: ['./time-zone-picker.component.scss']
})
export class TimeZonePicker extends Picker implements OnInit, AfterViewInit {

  @ViewChild('timeZoneFocus', {static: true}) timeZoneFocus: ElementRef;
  public timezones: Array<{ name: string; displayName: string, offset: string, zone: string, zoneAbbr: string }> = [];
  public tzSearchResults: Array<{ name: string; displayName: string, offset: string, zone: string, zoneAbbr: string }> = [];
  public userTimezone: any;
  public searchText = '';
  public selectedTz: any = null;
  public clearVisible = false;
  formControl: FormControl;
  private abbrsMap = {
    EST: 'Eastern Standard Time',
    EDT: 'Eastern Daylight Time',
    CST: 'Central Standard Time',
    CDT: 'Central Daylight Time',
    MST: 'Mountain Standard Time',
    MDT: 'Mountain Daylight Time',
    PST: 'Pacific Standard Time',
    PDT: 'Pacific Daylight Time',
    AKDT: 'Alaska Daylight Time',
    AKST: 'Alaska Standard Time',
    ADT: 'Atlantic Daylight Time',
    AST: 'Atlantic Standard Time',
    GMT: 'Greenwich Mean Time',
    NDT: 'Newfoundland Daylight Time',
    NST: 'Newfoundland Standard Time',
    HDT: 'Hawaii Daylight Time',
    HST: 'Hawaii Standard Time',
    SST: 'Samoa Standard Time',
  };

  constructor() {
    super();
    this.buildTimezoneList();
    this.getUserTimezone();
    this.tzSearchResults = this.timezones;
  }

  ngOnInit() {
    if (this.params && this.params.value) {
      let index = -1;
      this.timezones.forEach((zone, i) => {
        if (zone.name === this.params.value) {
          index = i;
        }
      });
      if (index >= 0) {
        this.selectedTz = this.tzSearchResults[index];
      }
    }
  }

  ngAfterViewInit() {
    this.timeZoneFocus.nativeElement.focus();
  }

  buildTimezoneList() {
    const validTimeZones = momentTz.tz.names()
      .filter((timeZone) => {
        const allowedTimeZones = ['America/', 'US/', 'Australia/', 'NZ', 'Auckland', 'Chatham'];
        let timeZoneAllowed = false;
        allowedTimeZones.forEach(filterVal => {
          if (timeZone.indexOf(filterVal) > -1) {
            timeZoneAllowed = true;
          }
        });

        return timeZoneAllowed;
      });
    validTimeZones.forEach(item => {
      const tz = this.parseTimezone(item);
      this.timezones.push(tz);
    });
    this.timezoneListSort();
  }

  timezoneListSort() {
    this.timezones.sort((a, b) => {
      if (a.offset > b.offset) {
        return 1;
      }
      if (a.offset < b.offset) {
        return -1;
      }
      if (a.offset === b.offset) {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
      }
      return 0;
    });
  }

  parseTimezone(zone: string) {
    const split = zone.split('/');
    let displayName = split[split.length - 1].replace('_', ' ');
    if (displayName === 'NZ') {
      displayName = 'New Zealand';
    }

    let zoneAbbr = momentTz.tz(zone).format('z');
    if (zoneAbbr[0] === '-' || zoneAbbr[0] === '+') {
      zoneAbbr = null;
    }

    return {
      name: zone,
      displayName,
      offset: momentTz.tz(zone).format('Z'),
      zone: zoneAbbr ? this.abbrsMap[zoneAbbr] : null,
      zoneAbbr
    };
  }

  select(i: number) {
    this.selectedTz = this.tzSearchResults[i];
  }

  canSubmit(): boolean {
    return !!this.selectedTz;
  }

  submit() {
    this.pick(this.selectedTz.name);
    this.formControl.markAsDirty();
  }

  getUserTimezone() {
    const userTz = momentTz.tz.guess();
    this.userTimezone = this.parseTimezone(userTz);
  }

  selectLocal() {
    this.selectedTz = this.userTimezone;
  }

  clearSearch() {
    this.searchText = '';
    this.search();
  }

  search() {
    this.clearVisible = !(this.searchText === '');
    const regex = this.searchText?.toUpperCase().replace(' ', '');
    this.tzSearchResults = this.timezones.filter(tz => {
      if (tz.zoneAbbr) {
        return !!(tz.name?.toUpperCase().replace('_', '').match(regex)
          || tz.zoneAbbr?.toUpperCase().match(regex)
          || tz.zone?.toUpperCase().match(regex)
          || tz.displayName?.toUpperCase().replace(' ', '').match(regex));
      } else {
        return !!(tz.name?.toUpperCase().replace('_', '').match(regex)
          || tz.displayName?.toUpperCase().replace(' ', '').match(regex));
      }
    });
  }

}
