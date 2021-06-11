import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from '@model/User';
import { SignupService } from '@service/signup.service';
import { of, throwError } from 'rxjs';
import { AppModule } from 'src/app/app.module';

import { SignupFormComponent } from './signup-form.component';

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;
  const user: User = {
    dob: new Date(1997, 5, 12),
    name: 'test',
    surname: 'test',
    wallet: '0xEd1bB395f00B22454c22B6c76b645657c739D3cc',
    email: 'test@test.it',
  };

  let signupService: SignupService, buttons: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [SignupService],
      imports: [HttpClientTestingModule, RouterTestingModule, AppModule],
      declarations: [SignupFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    //select modal buttons
    buttons = Array.from(fixture.nativeElement.querySelectorAll('button'));
    //set fields
    component.formGroup.controls.name.setValue('test');
    component.formGroup.controls.surname.setValue('test');
    component.formGroup.controls.dob.setValue(1997 - 5 - 12);
    component.formGroup.controls.wallet.setValue(
      '0xEd1bB395f00B22454c22B6c76b645657c739D3cc'
    );
    component.formGroup.controls.email.setValue('test@test.it');
    component.formGroup.controls.password.setValue('Test123@');
    component.formGroup.controls.confirmPassword.setValue('Test123@');
    //track service
    signupService = fixture.debugElement.injector.get(SignupService);
  });

  it('should send signup request', () => {
    //mock request
    spyOn(signupService, 'signup').and.returnValue(of(user));
    //valid form
    expect(component.formGroup.valid).toBe(true);
    //confirm
    let saveButton = buttons[0];
    saveButton.click();
  });

  it('should show an error message with internal server error', () => {
    //mock request
    spyOn(signupService, 'signup').and.returnValue(throwError({ status: 500 }));
    //send data
    let saveButton = buttons[0];
    saveButton.click();
    //expects
    expect(component.errorMessage).toBe(
      'Non è stato possibile registrarti. Riprova più tardi.'
    );
  });

  it('should show an error message if email already in system', () => {
    //mock request
    spyOn(signupService, 'signup').and.returnValue(throwError({ status: 409 }));
    //send data
    let saveButton = buttons[0];
    saveButton.click();
    //expects
    expect(component.errorMessage).toBe(
      'Indirizzo e-mail già registrato nel sistema.'
    );
  });

  it('should show an error message with wrong data requests', () => {
    //mock request
    spyOn(signupService, 'signup').and.returnValue(throwError({ status: 400 }));
    //send data
    let saveButton = buttons[0];
    saveButton.click();
    //expects
    expect(component.errorMessage).toBe('Campi non compilati correttamente.');
  });

  it('should show an error message with wrong email input', () => {
    component.formGroup.controls.email.setValue('test');
    //send data
    let saveButton = buttons[0];
    saveButton.click();
    //expects
    expect(component.errorMessage)
      .toBe(`Formato e-mail non valido. Assicurati di
          averla inserita correttamente.`);
  });

  it('should show an error message if psw != conf psw', () => {
    component.formGroup.controls.confirmPassword.setValue('test');
    //send data
    let saveButton = buttons[0];
    saveButton.click();
    //expects
    expect(component.errorMessage).toBe('Le password non coincidono.');
  });

  it('should show an error message with wrong psw input', () => {
    component.formGroup.controls.password.setValue('test');
    component.formGroup.controls.confirmPassword.setValue('test');
    //send data
    let saveButton = buttons[0];
    saveButton.click();
    //expects
    expect(component.errorMessage)
      .toBe(`La password deve contere almeno 8 caratteri,
        una lettera minuscola e maiuscola ed un carattere speciale.`);
  });

  it('should show an error message with wrong wallet input', () => {
    component.formGroup.controls.wallet.setValue('test');
    //send data
    let saveButton = buttons[0];
    saveButton.click();
    //expects
    expect(component.errorMessage)
      .toBe(`Indirizzo del wallet non corretto: deve contenere 40 caratteri
                alfanumerici, tra 0 e 9 e tra A ed F, ed iniziare per "0x".`);
  });
});
