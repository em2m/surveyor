
import {throwError as observableThrowError, Observable, Subject} from 'rxjs';
import {Injectable, Type} from '@angular/core';
import {Picker} from './picker.component';
import {PickerOptions} from './picker.model';
import {ModalService} from '../modal/modal.service';
import {ExtensionService} from '../../core/extension/extension.service';
import {Extension} from '../../core/extension/extension.model';

@Injectable()
export class PickerService {

  private pickers: {[type: string]: Type<Picker>} = {};
  private PICKER_EXTENSION_TYPE = 'surveyor:picker';

  constructor(private extensionService: ExtensionService, private modalService: ModalService) {
    this.registerPickers();
  }

  registerPickers() {
    // Register all components defined as plugin extensions
    this.extensionService.getExtensionsForType(this.PICKER_EXTENSION_TYPE).forEach((extension: Extension) => {
      let pickerType = extension.config.type;
      if (pickerType) {
        this.registerPicker(pickerType, extension.value);
      }
    });
  }

  registerPicker(type: string, picker: Type<Picker>) {
    this.pickers[type] = picker;
  }

  pick(type: string, pickerOptions?: PickerOptions): Observable<any> {
    // Retrieve the picker for the specified type
    let picker = this.pickers[type];
    if (picker == null) {
      return observableThrowError({error: 'Unable to resolve picker for type: ' + type});
    }

    if (!pickerOptions) { pickerOptions = {}; }
    if (!pickerOptions.type) { pickerOptions.type = 'side'; }
    if (pickerOptions.type === 'side') {
      if (!pickerOptions.width) {
        pickerOptions.width = 350;
      }
    }

    let pickerResponse = new Subject<any>();
    let modal = this.modalService.open(picker, pickerOptions);
    modal.submit.subscribe((result: any) => {
      pickerResponse.next(result);
      modal.dismiss();
    });
    modal.cancel.subscribe(() => {
      pickerResponse.next(null);
      modal.dismiss();
    });

    // Return observable which will be resolved by the picker selection within the picker container
    return pickerResponse.asObservable();
  }
}
