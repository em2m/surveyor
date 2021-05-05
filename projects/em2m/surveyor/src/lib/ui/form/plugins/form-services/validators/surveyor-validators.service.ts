import {AbstractControl} from '@angular/forms';
import has = Reflect.has;

export class SurveyorValidators {

  static isValidEmailFormat(c: AbstractControl) {
    const EMAIL_REGEXP = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
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
  static hasRoleSelected(c: AbstractControl) {
    const temp = c.value;
    let inValidRole = true;
    if (temp !== undefined) {
      for (const role of temp) {
        if (role.selected) {
          inValidRole = false;
        }
      }
      return inValidRole ? {inValidRole} : null;
    } else {
      return {inValidRole};
    }
  }
}
