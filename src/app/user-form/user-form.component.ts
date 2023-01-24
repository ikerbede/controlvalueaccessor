import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { User } from '../models/user.model';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => UserFormComponent),
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => UserFormComponent),
    },
  ],
})
export class UserFormComponent
  implements ControlValueAccessor, OnInit, OnDestroy, Validator
{
  userGroup = new FormGroup({
    login: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });
  disabled = false;

  private _detroyed = new Subject<void>();

  ngOnInit(): void {
    this.userGroup.valueChanges
      .pipe(
        filter(
          (user: Partial<User>) =>
            this.userGroup.valid &&
            !!user.login?.trim() &&
            !!user.email?.trim() &&
            !!user.password?.trim()
        ),
        map(
          (user: Partial<User>) =>
            ({
              login: user.login.trim(),
              email: user.email.trim(),
              password: user.password.trim(),
            } as User)
        ),
        takeUntil(this._detroyed)
      )
      .subscribe((user: User) => this._onChange(user));
  }

  ngOnDestroy(): void {
    this._detroyed.next();
    this._detroyed.complete();
  }

  onTouched = () => {};

  registerOnChange(fn: (user: User) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(user: User | undefined | null): void {
    this.userGroup.setValue(user ?? { login: '', email: '', password: '' }, {
      emitEvent: false,
    });
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.userGroup.disable() : this.userGroup.enable();
  }

  validate(): ValidationErrors {
    let errors: ValidationErrors = {};
    const loginErrors = this.userGroup.controls.login.errors;
    const emailErrors = this.userGroup.controls.email.errors;
    const passwordErrors = this.userGroup.controls.password.errors;

    if (loginErrors) {
      errors['login'] = loginErrors;
    }
    if (emailErrors) {
      errors['email'] = emailErrors;
    }
    if (passwordErrors) {
      errors['password'] = passwordErrors;
    }
    return errors;
  }

  private _onChange = (user: User) => {};
}
