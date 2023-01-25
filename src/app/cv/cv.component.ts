import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
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
import { ExperienceComponent } from '../experience/experience.component';
import { Cv } from '../models/cv.model';
import { Experience } from '../models/experience.model';

@Component({
  selector: 'cv',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ExperienceComponent,
    ExperienceFormComponent,
  ],
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvComponent {
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
  cvs: Cv[] = [];

  constructor() {}

  addCv(event: Event): void {
    event.preventDefault();
    this.cvs.push(this.cvGroup.value as Cv);
    this.cvGroup.reset();
  }

  addExperience(): void {
    this.cvGroup.controls.experiences.push(new FormControl(EXPERIENCE_DEFAULT));
  }

  removeExperience(index: number): void {
    this.cvGroup.controls.experiences.removeAt(index);
  }
}
