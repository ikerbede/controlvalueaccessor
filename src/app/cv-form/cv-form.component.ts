import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ExperienceFormComponent,
  EXPERIENCE_DEFAULT,
} from '../experience-form/experience-form.component';
import { Cv } from '../models/cv.model';

@Component({
  selector: 'cv-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ExperienceFormComponent],
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvFormComponent {
  @Output() cvAdded = new EventEmitter<Cv>();

  cvGroup = new FormGroup({
    firstName: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    lastName: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    birthDate: new FormControl(new Date('2000-01-01'), {
      nonNullable: true,
      validators: Validators.required,
    }),
    experiences: new FormArray([new FormControl(EXPERIENCE_DEFAULT)]),
  });

  constructor() {}

  addCv(event: Event): void {
    event.preventDefault();
    this.cvAdded.emit(this.cvGroup.value as Cv);
    this.cvGroup.reset();
  }

  addExperience(): void {
    this.cvGroup.controls.experiences.push(new FormControl(EXPERIENCE_DEFAULT));
  }

  removeExperience(index: number): void {
    this.cvGroup.controls.experiences.removeAt(index);
  }
}
