import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { User } from '@model/User';

@Injectable()
export class MockAuthenticationService {
  user: User = {
    dob: new Date('1997/05/12'),
    name: 'Michele',
    surname: 'Baldisseri',
    wallet: '0x123456789',
    email: 'prova@gmail.com',
  };
  constructor() {}

  login(data: Object) {
    return of(this.user);
  }
}
