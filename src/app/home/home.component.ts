import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor() {}

  checkAuth(): boolean {
    return typeof localStorage.getItem('User') === typeof 'string';
  }

  logout(): void {
    localStorage.clear();
  }
}
