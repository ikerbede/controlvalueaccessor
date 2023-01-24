import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '../models/user.model';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  @Input() user!: User;
}
