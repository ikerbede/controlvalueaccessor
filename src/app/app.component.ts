import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CvFormComponent } from './cv-form/cv-form.component';
import { CvComponent } from './cv/cv.component';
import { Cv } from './models/cv.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CvComponent, CvFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  cvs: Cv[] = [];

  addCv(cv: Cv): void {
    this.cvs.push(cv);
  }
}
