import {Plugin} from "../../../../core/extension/extension.model";
import {MdlSelectInputComponent} from "./select-input/select-input.component";
import {MdlTextInputComponent} from "./text-input/text-input.component";
import {MdlTextAreaInputComponent} from "./text-area-input/text-area-input.component";
import {MdlCheckboxInputComponent} from "./checkbox-input/checkbox-input.component";
import {ConfirmedPasswordInputComponent} from "./confirmed-password-input/confirmed-password-input.component";
import {MdlPickerInputComponent} from "./picker-input/picker-input.component";
import {MdlPasswordInputComponent} from "./password-input/password-input.component";

export * from "./select-input/select.model";
export * from "./select-input/select-input.component";
export * from "./select-input/selectable-item.component";
export * from "./text-area-input/text-area-input.component";
export * from "./text-input/text-input.component";
export * from "./checkbox-input/checkbox-input.component";
export * from "./password-input/password-input.component";
export * from "./confirmed-password-input/confirmed-password-input.component";
export * from "./picker-input/picker-input.component";

export let MdlFormPlugin: Plugin = <Plugin> {
  name: "MDL Forms Plugin",
  extensions: {
    "surveyor:form-input": [
      {
        value: MdlSelectInputComponent,
        config: {type: "Select"},
        priority: 100
      },
      {
        value: MdlTextInputComponent,
        config: {type: "Text"},
        priority: 100
      },
      {
        value: MdlTextAreaInputComponent,
        config: {type: "TextArea"},
        priority: 100
      },
      {
        value: MdlCheckboxInputComponent,
        config: {type: "Checkbox"},
        priority: 100
      },
      {
        value: ConfirmedPasswordInputComponent,
        config: {type: "ConfirmedPassword"},
        priority: 100
      },
      {
        value: MdlPasswordInputComponent,
        config: {type: "Password"},
        priority: 100
      },
      {
        value: MdlPickerInputComponent,
        config: {type: "Picker"},
        priority: 100
      }
    ]
  }
};
