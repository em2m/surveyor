import {MaskedValue} from "../../../../mask/mask.model";

export class SurveyorMasks {

  static phoneNumberMask(params: any): any {
    if (params.modelViewValue) {
      return ($event: any, value: string): string => {
        let model = updateModelValue($event, value);
        return formatAsPhoneNumber(model);
      };
    } else {
      return ($event: any, value: string): MaskedValue => {
        let model = updateModelValue($event, value);
        return {modelValue: model, viewValue: formatAsPhoneNumber(model)};
      };
    }

    function updateModelValue($event: any, value: string): string {
      let eventVal = $event.key.replace(/\D/g, '');
      let newModelVal = value ? value.replace(/\D/g, '') + eventVal : eventVal;

      if ($event.key === "Backspace") {
        newModelVal = newModelVal.substring(0, newModelVal.length - 1);
      }

      if (newModelVal.length > 10) {
        newModelVal = newModelVal.substring(0, 10)
      }

      return newModelVal;
    }

    function formatAsPhoneNumber(value: string): string {
      let newVal = "";
      if (value.length === 0) {} else if (value.length <= 3) {
        newVal = value.replace(/^(\d{0,3})/, '($1)');
      } else if (value.length <= 6) {
        newVal = value.replace(/^(\d{0,3})(\d{0,3})/, '($1) $2');
      } else {
        newVal = value.replace(/^(\d{0,3})(\d{0,3})(.*)/, '($1) $2-$3');
      }
      return newVal;
    }
  }

  static dollarMask(params: any): any {
    if (params.modelViewValue) {
      return ($event: any, value: string): string => {
        let model = updateModelValue($event, value);
        return formatAsDollarValue(model);
      };
    } else {
      return ($event: any, value: string): MaskedValue => {
        let model = updateModelValue($event, value);
        return {modelValue: model, viewValue: formatAsDollarValue(model)};
      };
    }

    function updateModelValue($event, value: string): string {
      let eventVal = $event.key.replace(/[^$0-9\.]/g, '');
      let newModelVal = value ? value.toString().replace(/[^$0-9\.]/g, '') + eventVal : eventVal;
      newModelVal = newModelVal.toString().replace('$', '');

      if ($event.key === "Backspace") {
        newModelVal = newModelVal.substring(0, newModelVal.length - 1);
      }

      return newModelVal;
    }

    function formatAsDollarValue(value: string): string {
      value = value.replace("$", "");
      if (value.indexOf(".") > -1 && (Math.abs(value.indexOf(".") - value.length - 1) > 1)) {
        value = value.substring(0, value.indexOf(".") + 3);
      }
      return '$' + value;
    }
  }
}
