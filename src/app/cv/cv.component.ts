import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ExperienceComponent } from '../experience/experience.component';
import { Cv } from '../models/cv.model';

@Component({
  selector: 'cv',
  standalone: true,
  imports: [CommonModule, ExperienceComponent],
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvComponent {
  @Input() cv: Cv;
}
