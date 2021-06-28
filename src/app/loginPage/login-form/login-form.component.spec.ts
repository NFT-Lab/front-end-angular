import { AppModule } from './../../app.module';
import { AuthenticationService } from '@service/authentication.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginFormComponent } from './login-form.component';
import { of, throwError } from 'rxjs';
import { User } from '@model/User';

describe('Authentication with correct inputs', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let user: User = {
    dob: new Date(),
    name: 'test',
    surname: 'test',
    wallet: 'test',
    email: 'test',
  };
  let email: any, password: any, loginButton: any;
  let authService: AuthenticationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [AuthenticationService],
      imports: [HttpClientTestingModule, RouterTestingModule, AppModule],
      declarations: [LoginFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    //set form fields
    email = fixture.nativeElement.querySelector('input[formControlName=email]');
    password = fixture.nativeElement.querySelector(
      'input[formControlName=password]'
    );
    loginButton = fixture.nativeElement.querySelector('button[type=submit]');
    //set input fields
    email.value = 'test@test.it';
    password.value = 'Test123@';
    email.dispatchEvent(new Event('input'));
    password.dispatchEvent(new Event('input'));
    authService = fixture.debugElement.injector.get(AuthenticationService);
  });

  it('form should be valid with correct inputs', () => {
    spyOn(authService, 'login').and.returnValue(of(user));
    //login
    loginButton.click();
    //expects
    expect(component.formGroup.controls.email.value).toBe('test@test.it');
    expect(component.formGroup.controls.password.value).toBe('Test123@');
    expect(component.formGroup.valid).toBe(true);
  });

  it('should show a specific error if server responds with error 400', () => {
    spyOn(authService, 'login').and.returnValue(throwError({ status: 400 }));
    //login
    loginButton.click();
    //expects
    expect(component.formGroup.valid).toBe(true);
    expect(component.errorMessage).toBe('Campi non compilati correttamente');
  });

  it('should show a specific error if server responds with error 404', () => {
    spyOn(authService, 'login').and.returnValue(throwError({ status: 404 }));
    //login
    loginButton.click();
    //expects
    expect(component.formGroup.valid).toBe(true);
    expect(component.errorMessage).toBe('Nessunca corrispondenza');
  });
});

describe('Authentication with wrong inputs', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let email: any, password: any, loginButton: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [AuthenticationService],
      imports: [HttpClientTestingModule, RouterTestingModule, AppModule],
      declarations: [LoginFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    //set form fields
    email = fixture.nativeElement.querySelector('input[formControlName=email]');
    password = fixture.nativeElement.querySelector(
      'input[formControlName=password]'
    );
    loginButton = fixture.nativeElement.querySelector('button[type=submit]');
  });

  it('should show an error message for invalid input', () => {
    let error = fixture.nativeElement.querySelector('#error');
    //set input fields
    email.value = 'test';
    password.value = 'test';
    email.dispatchEvent(new Event('input'));
    password.dispatchEvent(new Event('input'));
    //expects
    expect(component.formGroup.valid).toBe(false);
    expect(error).toBeTruthy();
  });

  it('should show a different error for every wrong input', () => {
    //set input fields for email error
    email.value = 'test';
    password.value = 'Test123@';
    email.dispatchEvent(new Event('input'));
    password.dispatchEvent(new Event('input'));
    //login
    loginButton.click();
    //expects
    expect(component.formGroup.controls.email.valid).toBe(false);
    expect(component.errorMessage)
      .toBe(`Formato e-mail non valido. Assicurati di
          averla inserita correttamente.`);
    expect(component.formGroup.valid).toBe(false);
    //set input fields for password error
    email.value = 'test@test.it';
    password.value = 'test';
    email.dispatchEvent(new Event('input'));
    password.dispatchEvent(new Event('input'));
    //login
    loginButton.click();
    //expects
    expect(component.formGroup.controls.password.valid).toBe(false);
    expect(component.errorMessage)
      .toBe(`La password deve contere almeno 8 caratteri,
        una lettera minuscola e maiuscola ed un carattere speciale.`);
    expect(component.formGroup.valid).toBe(false);
  });
});
