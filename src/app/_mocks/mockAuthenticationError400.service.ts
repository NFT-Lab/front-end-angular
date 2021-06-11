import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { User } from '@model/User';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class MockAuthenticationError404 {
  errorResponse = new HttpErrorResponse({
    error: '400 error',
    status: 400,
    statusText: 'Bad Request',
  });
  constructor() {}

  login(data: Object) {
    return of(this.errorResponse);
  }
}
