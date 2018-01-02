import {TimeZonePicker} from "./pickers/time-zone-picker/time-zone-picker.component";
import {Plugin} from "../../core/extension/extension.model";

export let PickerPlugin: Plugin = <Plugin> {
  name: "Picker Plugin",
  extensions: {
    "surveyor:picker": [
      {value: TimeZonePicker, config: {type: "time-zone"}}
    ],
  }
};
