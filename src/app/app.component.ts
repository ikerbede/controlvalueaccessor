import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from './models/user.model';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  users: User[] = [];
  userControl: FormControl<User> = new FormControl();

  constructor() {}

  addUser(event: Event): void {
    event.preventDefault();
    this.users.push(this.userControl.value);
    this.userControl.reset();
  }
}
