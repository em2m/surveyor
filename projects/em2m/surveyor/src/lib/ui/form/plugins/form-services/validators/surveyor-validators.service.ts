import {AbstractControl} from '@angular/forms';

export class SurveyorValidators {

  static isValidEmailFormat(c: AbstractControl) {
    const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (c.value && !EMAIL_REGEXP.test(c.value)) {
      return {invalidEmail: true};
    } else {
      return null;
    }
  }

  static isValidPhoneFormat(c: AbstractControl) {
    const temp = (c.value || '').replace(/\D/g, '');
    if (temp.length === 10 || temp.length === 0) {
      return null;
    } else {
      return { invalidPhoneNumber: true };
    }
  }

  static isValidToken(c: AbstractControl) {
    const tokenRegex = /[a-z0-9]{6}/gi;
    if (c.value && !tokenRegex.test(c.value)) {
      return {invalidToken: true};
    } else {
      return null;
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
