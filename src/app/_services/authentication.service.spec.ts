import { HttpClientTestingModule } from '@angular/common/http/testing';
import { User } from '@model/User';
import { TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    });
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login() should return User data', () => {
    let userInput = { email: 'test@test.it', password: 'Test123@' };
    let user: User;
    (done: DoneFn) => {
      service.login(userInput).subscribe((value) => {
        expect(value).toBeTruthy();
        expect(typeof value).toBe(typeof user);
        done();
      });
    };
  });
});
