import {TermPickerComponent} from './pickers/term-picker/term-picker.component';
import {Plugin} from '../core/extension/extension.model';
import {QueryPickerComponent} from './pickers/query-picker/query-picker.component';
import {DateRangePickerComponent} from './pickers/date-range-picker/date-range-picker.component';

export let SearchPlugin: Plugin = <Plugin> {
  name: 'Search Plugin',
  extensions: {
    'surveyor:picker': [
      {value: TermPickerComponent, config: {type: 'term-picker'}},
      {value: QueryPickerComponent, config: {type: 'query'}},
      {value: DateRangePickerComponent, config: {type: 'date-range'}}
    ]
  }
};
