import {MaskedValue} from '../../../../mask/mask.model';

export class SurveyorMasks {

  static phoneNumberMask(params: any): any {
    if (params && params.displayMaskedValue) {
      return ($event: any, value: string): string => {
        const model = updateModelValue($event, value);
        return formatAsPhoneNumber(model);
      };
    } else {
      return ($event: any, value: string): MaskedValue => {
        const model = updateModelValue($event, value);
        return {modelValue: model, viewValue: formatAsPhoneNumber(model)};
      };
    }

    function updateModelValue($event: any, value: string): string {
      const eventVal = $event.key.replace(/\D/g, '');
      let newModelVal = value ? value.replace(/\D/g, '') + eventVal : eventVal;

      if ($event.key === 'Backspace') {
        newModelVal = newModelVal.substring(0, newModelVal.length - 1);
      }

      if (newModelVal.length > 15) {
        newModelVal = newModelVal.substring(0, 15);
      }

      return newModelVal;
    }

    function formatAsPhoneNumber(value: string): string {
      let newVal = '';
      if (value.length === 0) {} else if (value.length <= 3) {
        newVal = value.replace(/^(\d{0,3})/, '($1)');
      } else if (value.length <= 6) {
        newVal = value.replace(/^(\d{0,3})(\d{0,3})/, '($1) $2');
      } else if (value.length <= 10) {
        newVal = value.replace(/^(\d{0,3})(\d{0,3})(.*)/, '($1) $2-$3');
      } else {
        const countryCodeLength = value.length - 10;
        const countryCode = value.substring(0, countryCodeLength);
        const remaining = value.substring(countryCodeLength);
        newVal = '+' + countryCode + ' ' + remaining.replace(/^(\d{0,3})(\d{0,3})(.*)/, '($1) $2-$3');
      }
      return newVal;
    }
  }

  static dollarMask(params: any): any {
    if (params && params.displayMaskedValue) {
      return ($event: any, value: string): string => {
        const model = updateModelValue($event, value);
        return formatAsDollarValue(model);
      };
    } else {
      return ($event: any, value: string): MaskedValue => {
        const model = updateModelValue($event, value);
        return {modelValue: model, viewValue: formatAsDollarValue(model)};
      };
    }

    function updateModelValue($event, value: string): string {
      const eventVal = ($event.key || '').replace(/[^$0-9\.]/g, '');
      let newModelVal = value ? value.toString().replace(/[^$0-9\.]/g, '') + eventVal : eventVal;
      newModelVal = newModelVal.toString().replace('$', '');

      if ($event.key === 'Backspace') {
        newModelVal = newModelVal.substring(0, newModelVal.length - 1);
      }

      return newModelVal;
    }

    function formatAsDollarValue(value: string): string {
      value = (value || '').replace('$', '');
      if (value.indexOf('.') > -1 && (Math.abs(value.indexOf('.') - value.length - 1) > 1)) {
        value = value.substring(0, value.indexOf('.') + 3);
      }
      return '$' + value;
    }
  }


  static internationalPhoneNumberMask(params: any): any {
    if (params && params.displayMaskedValue) {
      return ($event: any, value: string): string => {
        const model = updateModelValue($event, value);
        return formatAsPhoneNumber(model);
      };
    } else {
      return ($event: any, value: string): MaskedValue => {
        const model = updateModelValue($event, value);
        return {modelValue: model, viewValue: formatAsPhoneNumber(model)};
      };
    }

    function updateModelValue($event: any, value: string): string {
      const eventVal = $event.key.replace(/\D/g, '');
      let newModelVal = value ? value.replace(/\D/g, '') + eventVal : eventVal;

      if ($event.key === 'Backspace') {
        newModelVal = newModelVal.substring(0, newModelVal.length - 1);
      }

      if (newModelVal.length > 15) {
        newModelVal = newModelVal.substring(0, 15);
      }

      return newModelVal;
    }

    function formatAsPhoneNumber(value: string): string {
      let newVal = '';
      if (value.length === 0) {} else if (value.length <= 15) {
        newVal = value.replace(/^(\d{0,15})/, '$1');
      }
      return newVal;
    }
  }
}
