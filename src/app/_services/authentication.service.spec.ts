import { environment } from './../../environments/environment';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { AppModule } from '../app.module';

import { AuthenticationService } from './authentication.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('AuthenticationService', () => {
  const data = {
    email: 'test@test.it',
    password: 'Test123@',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AppModule],
      providers: [AuthenticationService],
    });
  });

  it('should update user info correctly', fakeAsync(
    inject(
      [AuthenticationService, HttpTestingController],
      (loginService: AuthenticationService, backend: HttpTestingController) => {
        // Set up
        const responseObject = {
          success: true,
          message: 'user info updated',
        };
        let response: any = null;
        // End Setup
        loginService.login(data).subscribe(
          (receivedResponse: any) => {
            response = receivedResponse;
          },
          (error: any) => {}
        );

        const requestWrapper = backend.expectOne({
          url: environment.apiUrl + '/login',
        });
        requestWrapper.flush(responseObject);

        tick();

        expect(requestWrapper.request.method).toEqual('POST');
      }
    )
  ));
});
