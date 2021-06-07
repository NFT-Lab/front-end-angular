import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor() {}

  checkAuth(): boolean {
    return localStorage.getItem('User') === null;
  }

  logout(): void {
    localStorage.clear();
  }
}
