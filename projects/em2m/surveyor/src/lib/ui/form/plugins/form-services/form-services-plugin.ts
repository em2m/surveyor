import {Plugin} from "../../../../core/extension/extension.model";
import {Validators} from "@angular/forms";
import {SurveyorMasks} from "./masks/surveyor-masks.service";
import {SurveyorValidators} from "./validators/surveyor-validators.service";

export * from "./masks/surveyor-masks.service";
export * from "./validators/surveyor-validators.service";

export let FormServicesPlugin: Plugin = <Plugin> {
  name: "Form Services Plugin",
  extensions: {
    "surveyor:form-validator": [
      {
        value: Validators,
        config: {type: "Validators"}
      },
      {
        value: SurveyorValidators,
        config: {type: "Surveyor"}
      }
    ],
    "surveyor:form-mask": [
      {
        value: SurveyorMasks,
        config: {type: "Surveyor"}
      }
    ]
  }
};
