import { AppModule } from './../../app.module';
import { MockAuthenticationService } from '@mocks/mockAuthentication.service';
import { AuthenticationService } from '@service/authentication.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthenticationService,
          useClass: MockAuthenticationService,
        },
      ],
      imports: [HttpClientTestingModule, RouterTestingModule, AppModule],
      declarations: [LoginFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show an error message for invalid input', () => {
    let email = fixture.nativeElement.querySelector(
        'input[formControlName=email]'
      ),
      password = fixture.nativeElement.querySelector(
        'input[formControlName=password]'
      ),
      error = fixture.nativeElement.querySelector('#error');
    email.value = 'test';
    password.value = 'test';
    expect(component.formGroup.valid).toBeFalsy();
    expect(error).toBeTruthy();
  });

  it('should set data in local storage if login success', () => {
    let email = fixture.nativeElement.querySelector(
        'input[formControlName=email]'
      ),
      password = fixture.nativeElement.querySelector(
        'input[formControlName=password]'
      ),
      loginButton = fixture.nativeElement.querySelector('button[type=submit]');
    email.value = 'test';
    password.value = 'test';
    loginButton.click();
    expect(component.errorMessage).toBeTruthy();
  });
});
