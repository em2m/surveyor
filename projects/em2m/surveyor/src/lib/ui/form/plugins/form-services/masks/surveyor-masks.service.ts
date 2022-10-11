import {MaskedValue} from '../../../../mask/mask.model';

export class SurveyorMasks {

  static phoneNumberMask(params: any): any {
    if (params && params.displayMaskedValue) {
      return ($event: any, value: string): string => {
        const model = updateModelValue($event, value);
        return model.length > 0 ? formatAsPhoneNumber(model) : '';
      };
    } else {
      return ($event: any, value: string): MaskedValue => {
        const model = updateModelValue($event, value);
        return {modelValue: model, viewValue: model.length > 0 ? formatAsPhoneNumber(model) : ''};
      };
    }

    function updateModelValue($event: any, value: string): string {
      const eventVal = $event.key.replace( /[^0-9 +-]/g, '');
      let newModelVal = value ? value + eventVal : eventVal;

      if ($event.key === 'Backspace') {
        newModelVal = newModelVal.substring(0, newModelVal.length - 1);
      }
      return newModelVal;
    }

    function formatAsPhoneNumber(value: string): string {
      const rawPhoneNumber = value.replace(/\D/g, '');

      let newVal = '';
      if (value.substring(0, 1) !== '+' && rawPhoneNumber.length > 0 && rawPhoneNumber.length <= 10) {
        // domestic phone number
        if (rawPhoneNumber.length <= 3) {
          newVal = rawPhoneNumber.replace(/^(\d{0,3})/, '($1)');
        } else if (rawPhoneNumber.length <= 6) {
          newVal = rawPhoneNumber.replace(/^(\d{0,3})(\d{0,3})/, '($1) $2');
        } else if (rawPhoneNumber.length <= 10) {
          newVal = rawPhoneNumber.replace(/^(\d{0,3})(\d{0,3})(.*)/, '($1) $2-$3');
        }
      } else {
        // international phone number
        if (/[()]/.test(value)) {
          newVal = `+${value.replace(/\D/g, '')}`;
        } else if (value.substring(0, 1) !== '+') {
          newVal = `+${value}`;
        } else {
          newVal = value;
        }
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
