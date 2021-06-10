import { environment } from './../../environments/environment';
import { User } from '@model/User';
import { AppModule } from 'src/app/app.module';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';

import { UserManagementService } from './user-management.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Psw } from '@model/Psw';

describe('UserManagementService', () => {
  const user: User = {
    dob: new Date(1997, 5, 12),
    name: 'test',
    surname: 'test',
    wallet: '0xEd1bB395f00B22454c22B6c76b645657c739D3cc',
    email: 'test@test.it',
  };
  const psw: Psw = {
    id: '12',
    oldPassword: 'Test132@',
    newPassword: 'Test123@@',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AppModule],
      providers: [UserManagementService],
    });
  });

  it('should update user info correctly', fakeAsync(
    inject(
      [UserManagementService, HttpTestingController],
      (
        userManService: UserManagementService,
        backend: HttpTestingController
      ) => {
        // Set up
        const responseObject = {
          success: true,
          message: 'user info updated',
        };
        let response: any = null;
        // End Setup
        userManService.updateUserInfo(user, '12').subscribe(
          (receivedResponse: any) => {
            response = receivedResponse;
          },
          (error: any) => {}
        );

        const requestWrapper = backend.expectOne({
          url: environment.apiUrl + '/user/12',
        });
        requestWrapper.flush(responseObject);

        tick();

        expect(requestWrapper.request.method).toEqual('PUT');
      }
    )
  ));

  it('should update password correctly', fakeAsync(
    inject(
      [UserManagementService, HttpTestingController],
      (
        userManService: UserManagementService,
        backend: HttpTestingController
      ) => {
        // Set up
        const responseObject = {
          success: true,
          message: 'user info updated',
        };
        let response: any = null;
        // End Setup
        userManService.updatePsw(psw).subscribe(
          (receivedResponse: any) => {
            response = receivedResponse;
          },
          (error: any) => {}
        );

        const requestWrapper = backend.expectOne({
          url: environment.apiUrl + '/user/password',
        });
        requestWrapper.flush(responseObject);

        tick();

        expect(requestWrapper.request.method).toEqual('PUT');
      }
    )
  ));
});
