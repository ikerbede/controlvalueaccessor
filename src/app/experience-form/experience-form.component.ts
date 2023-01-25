import { CommonModule } from '@angular/common';
import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Experience } from '../models/experience.model';

export const EXPERIENCE_DEFAULT: Experience = {
  company: '',
  role: '',
  startDate: new Date(),
  endDate: null,
};

@Component({
  selector: 'experience-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './experience-form.component.html',
  styleUrls: ['./experience-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ExperienceFormComponent),
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => ExperienceFormComponent),
    },
  ],
})
export class ExperienceFormComponent
  implements ControlValueAccessor, OnInit, OnDestroy, Validator
{
  experienceGroup = new FormGroup({
    company: new FormControl(EXPERIENCE_DEFAULT.company, {
      nonNullable: true,
      validators: Validators.required,
    }),
    role: new FormControl(EXPERIENCE_DEFAULT.role, {
      nonNullable: true,
      validators: Validators.required,
    }),
    startDate: new FormControl(EXPERIENCE_DEFAULT.startDate, {
      nonNullable: true,
      validators: Validators.required,
    }),
    endDate: new FormControl(EXPERIENCE_DEFAULT.endDate),
  });
  disabled = false;

  private _detroyed = new Subject<void>();

  ngOnInit(): void {
    this.experienceGroup.valueChanges
      .pipe(
        filter(
          (experience: Partial<Experience>) =>
            this.experienceGroup.valid &&
            !!experience.company?.trim() &&
            !!experience.role?.trim() &&
            !!experience.startDate
        ),
        takeUntil(this._detroyed)
      )
      .subscribe((experience: Experience) => this._onChange(experience));
  }

  ngOnDestroy(): void {
    this._detroyed.next();
    this._detroyed.complete();
  }

  onTouched = () => {};

  registerOnChange(fn: (experience: Experience) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(experience: Experience | undefined | null): void {
    this.experienceGroup.setValue(experience ?? EXPERIENCE_DEFAULT, {
      emitEvent: false,
    });
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.experienceGroup.disable() : this.experienceGroup.enable();
  }

  validate(): ValidationErrors {
    let errors: ValidationErrors = {};
    const companyErrors = this.experienceGroup.controls.company.errors;
    const roleErrors = this.experienceGroup.controls.role.errors;
    const startDateErrors = this.experienceGroup.controls.startDate.errors;
    const endDateErrors = this.experienceGroup.controls.endDate.errors;

    if (roleErrors) {
      errors['role'] = roleErrors;
    }
    if (companyErrors) {
      errors['company'] = companyErrors;
    }
    if (startDateErrors) {
      errors['startDate'] = startDateErrors;
    }
    if (endDateErrors) {
      errors['endDate'] = endDateErrors;
    }
    return errors;
  }

  private _onChange = (experience: Experience) => {};
}
