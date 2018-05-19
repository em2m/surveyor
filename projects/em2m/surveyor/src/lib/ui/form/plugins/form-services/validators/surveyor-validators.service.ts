import {AbstractControl} from "@angular/forms";

export class SurveyorValidators {

  static isValidEmailFormat(c: AbstractControl) {
    let EMAIL_REGEXP = /\S+@\S+\.\S+/;
    if (c.value && (c.value.length <= 5 || !EMAIL_REGEXP.test(c.value))) {
      return {invalidEmail: true};
    } else {
      return null;
    }
  }

  static isValidPhoneFormat(c: AbstractControl) {
      let temp = c.value.replace(/\D/g, '');
      if (temp.length === 10) {
        return null;
      } else {
        return { invalidPhoneNumber: true };
      }
  }

  static mustBeOneOf(array: Array<any>) {
    /*
    return (c: AbstractControl) => {
      if (array.indexOf(c.value) === -1) {
        return {mustBeOneOf: true};
      } else {
        return null;
      }
    };
    */
  }
}
