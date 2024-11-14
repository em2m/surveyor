import {Component, OnInit} from '@angular/core';
import {SurveyorFormInputComponent} from '../../../form-input-component';
import {UntypedFormControl, ValidationErrors} from '@angular/forms';

@Component({
  selector: 'surveyor-mat-password-input',
  templateUrl: './mat-password.component.html',
  styleUrls: ['./mat-password.component.scss']
})
export class MaterialPasswordInputComponent extends SurveyorFormInputComponent {

  hide = true;
  passwordStrength: number;
  passwordMessage: string;
  passwordClass: string;

  validatePasswordStrength(c: UntypedFormControl): any {
    if (!c) {
      return;
    }
    let password = c.value || '';

    // Calculate strength
    let strength = 0;

    let points = 20; // points per test

    let pattern1 = /[A-Z]/g; // Contains uppercase letters
    let pattern2 = /[a-z]/g; // Contains lowercase letters
    let pattern3 = /[0-9]/g; // Contains digits
    let pattern4 = /[~`!@#$%^&*_+-]/g; // Contains a special character

    if (password.length >= 7) {
      strength += points;
    }
    if (password.match(pattern1) != null) {
      strength += points;
    }
    if (password.match(pattern2) != null) {
      strength += points;
    }
    if (password.match(pattern3) != null) {
      strength += points;
    }
    if (password.match(pattern4) != null) {
      strength += points;
    }

    this.passwordStrength = strength;

    const message = [
      {class: 'label-danger', val: 'Weak'},
      {class: 'label-danger', val: 'Weak'},
      {class: 'label-warning', val: 'Weak'},
      {class: 'label-success', val: 'Good'},
      {class: 'label-success', val: 'Strong'}
    ];

    let index = (strength - 20) / 20;
    if (password.length === 0) {
      this.passwordMessage = 'Password is required';
      this.passwordClass = 'label-danger';
      strength = 0;
    } else if (password.length < 8) {
      this.passwordMessage = 'Password is too short';
      this.passwordClass = 'label-danger';
      strength = 0;
    } else {
      this.passwordMessage = 'Password is ' + message[index].val;
      this.passwordClass = message[index].class;
    }

    if (strength > 60) {
      this.formControl.setErrors(null);
    } else {
      this.formControl.setErrors({ invalidPassword: true });
    }
  }
}
