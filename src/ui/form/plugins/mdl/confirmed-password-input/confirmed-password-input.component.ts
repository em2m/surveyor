import {ChangeDetectorRef, Component, OnDestroy, OnInit} from "@angular/core";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {SurveyorFormInputComponent} from "../../../form-input-component";

@Component({
  templateUrl: './confirmed-password-input.component.html',
  styleUrls: ['./confirmed-password-input.component.scss'],
})
export class ConfirmedPasswordInputComponent extends SurveyorFormInputComponent implements OnInit, OnDestroy {

  form: FormGroup;
  formSub: any;
  passwordClass = "";
  passwordMessage = "";
  passwordStrength = 0;

  indexToFormControlMap: {[key: number]: string} = {
    0 : 'password',
    1 : 'confirmPassword'
  };

  constructor(private cd: ChangeDetectorRef) {
    super();
  }

  canSubmit() {
    return this.form.valid;
  }

  ngOnInit() {
    this.form = new FormGroup({
      password: new FormControl("", [
        Validators.required,
        this.validatePasswordStrength.bind(this),
        this.validatePasswordMatchesConfirmPassword.bind(this)
      ]),
      confirmPassword: new FormControl("", [
        Validators.required,
        this.validateConfirmPasswordMatchesPassword.bind(this)
      ]),
    });

    this.formSub = this.form.valueChanges.subscribe( v => {
        this.formControl.setValue((v || {}).password);
    });

    this.formControl.setValidators([this.validateParentForm.bind(this)]);

    this.cd.detectChanges();
  }

  ngOnDestroy() {
    if (this.formSub) {
      this.formSub.unsubscribe();
    }
  }

  validateParentForm(c: AbstractControl): ValidationErrors {
    return this.form.controls.password.errors;
  }

  validatePasswordStrength(c: FormControl) {
    let password = c.value;
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
      {class: "label-danger", val: "Weak"},
      {class: "label-danger", val: "Weak"},
      {class: "label-warning", val: "Poor"},
      {class: "label-success", val: "Strong"},
      {class: "label-success", val: "Very Strong"}
    ];

    let index = (strength - 20) / 20;
    if (password.length === 0) {
      this.passwordMessage = "";
      this.passwordClass = "";
    } else if (password.length < 8) {
      this.passwordMessage = "Password is too short";
      this.passwordClass = "label-danger";
    } else {
      this.passwordMessage = message[index].val;
      this.passwordClass = message[index].class;
    }

    if (strength > 40) {
      return null;
    } else {
      return ({passwordNotStrongEnough: true});
    }
  }

  validatePasswordMatchesConfirmPassword(c: FormControl) {
    if (!this.form || c.value === this.form.controls['confirmPassword'].value) {
      return null;
    } else {
      this.formControl.setErrors({passwordsDoNotMatch: true});
      return ({passwordsDoNotMatch: true});
    }
  }

  validateConfirmPasswordMatchesPassword(c: FormControl) {
    if (!this.form || c.value === this.form.controls['password'].value) {
      if (this.form) {
        this.form.controls['password'].updateValueAndValidity();
      }
      return null;
    } else {
      this.formControl.setErrors({passwordsDoNotMatch: true});
      return ({passwordsDoNotMatch: true});
    }
  }

  public setToTouchedAndRevalidateFormGroup(index) {
    for (let i = 0; i <= index; i++) {
      this.form.controls[this.indexToFormControlMap[i]].markAsDirty();
    }
  }
}
