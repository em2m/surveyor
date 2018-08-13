import {Plugin} from '../../../../core/extension/extension.model';

import {MaterialSelectInputComponent} from './select/mat-select.component';
import {MaterialTextInputComponent} from './text/mat-text.component';
import {MaterialCheckboxInputComponent} from './checkbox/mat-checkbox.component';
import {MaterialTextAreaInputComponent} from './textarea/mat-textarea.component';
import {MaterialPickerInputComponent} from './picker/mat-picker.component';
import {MaterialPasswordInputComponent} from './password/mat-password.component';

export let MaterialFormPlugin: Plugin = <Plugin> {
  name: 'Material Forms Plugin',
  extensions: {
    'surveyor:form-input': [
      {
        value: MaterialSelectInputComponent,
        config: {type: 'Select'},
        priority: 50
      },
      {
        value: MaterialTextInputComponent,
        config: {type: 'Text'},
        priority: 50
      },
      {
        value: MaterialTextAreaInputComponent,
        config: {type: 'TextArea'},
        priority: 50
      },
      {
        value: MaterialCheckboxInputComponent,
        config: {type: 'Checkbox'},
        priority: 50
      },
      {
        value: MaterialPickerInputComponent,
        config: {type: 'Picker'},
        priority: 50
      },
      {
        value: MaterialPasswordInputComponent,
        config: {type: 'Password'},
        priority: 50
      }
    ]
  }
};
