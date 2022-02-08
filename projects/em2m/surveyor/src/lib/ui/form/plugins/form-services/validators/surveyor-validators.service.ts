import { AbstractControl } from '@angular/forms';
import has = Reflect.has;

export class SurveyorValidators {
  static isValidEmailFormat(c: AbstractControl) {
    const EMAIL_REGEXP = /^((([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$|^([^@]*<(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))>)$/;
    if (c.value && !EMAIL_REGEXP.test(c.value)) {
      return { invalidEmail: true };
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

  static isValidCreditCard(c: AbstractControl) {
    const temp = (c.value || '').replace(/\s/g, '');
    if (temp.length >= 15 && temp.length <= 19 && Number(temp)) {
      return null;
    } else {
      return { invalidCreditCard: true };
    }
  }

  static isValidToken(c: AbstractControl) {
    const tokenRegex = /[a-z0-9]{6}/gi;
    if (c.value && !tokenRegex.test(c.value)) {
      return { invalidToken: true };
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
      return inValidRole ? { inValidRole } : null;
    } else {
      return { inValidRole };
    }
  }

  static isValidUrl(c: AbstractControl) {
    const controlValue = c.value;
    if (!controlValue) return false;
    const validUrlRegex = /^[A-Za-z][A-Za-z\d.+-]*:\/*(?:\w+(?::\w+)?@)?[^\s/]+(?::\d+)?(?:\/[\w#!:.?+=&%@\-/]*)?$/;
    return validUrlRegex.test(controlValue);
  }
}
