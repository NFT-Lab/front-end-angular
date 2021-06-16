import { UserManagementService } from '@service/user-management.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPswFormComponent } from './modify-psw-form.component';
import { MatDialogRef } from '@angular/material/dialog';
import { AppModule } from 'src/app/app.module';
import { Psw } from '@model/Psw';
import { of, throwError } from 'rxjs';

describe('ModifyPswFormComponent', () => {
  let component: ModifyPswFormComponent;
  let fixture: ComponentFixture<ModifyPswFormComponent>;
  let oldPsw: any, newPsw: any, confPsw: any, buttons: any;

  const psw: Psw = {
    email: 'test@test.it',
    oldPassword: 'Test123@',
    newPassword: 'Test123@',
  };

  const dialogMock = {
    close: () => {},
  };

  let userManService: UserManagementService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        UserManagementService,
        { provide: MatDialogRef, useValue: dialogMock },
      ],
      imports: [AppModule],
      declarations: [ModifyPswFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyPswFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    //select fields
    oldPsw = fixture.nativeElement.querySelector(
      'input[formControlName=oldPassword]'
    );
    newPsw = fixture.nativeElement.querySelector(
      'input[formControlName=newPassword]'
    );
    confPsw = fixture.nativeElement.querySelector(
      'input[formControlName=confirmPsw]'
    );
    //select modal button
    buttons = Array.from(fixture.nativeElement.querySelectorAll('button'));
    //track service
    userManService = fixture.debugElement.injector.get(UserManagementService);
  });

  it('dialog should be closed', () => {
    let spy = spyOn(component.modalRef, 'close').and.callThrough();
    component.closeModal();
    expect(spy).toHaveBeenCalled();
  });

  it('should show an error if form is not filled out', () => {
    let saveButton = buttons[0];
    saveButton.click();
    expect(component.errorMessage).toBe('Compila tutti i campi.');
  });

  it('should show an error if new password = old password', () => {
    //set fields
    oldPsw.value = 'Test123@';
    newPsw.value = 'Test123@';
    confPsw.value = 'Test123@';
    oldPsw.dispatchEvent(new Event('input'));
    newPsw.dispatchEvent(new Event('input'));
    confPsw.dispatchEvent(new Event('input'));
    //
    let saveButton = buttons[0];
    saveButton.click();
    expect(component.errorMessage).toBe(
      'La nuova password deve essere diversa da quella attuale.'
    );
  });

  it('should show an error if new password != confirm password', () => {
    //set fields
    oldPsw.value = 'Test123@1';
    newPsw.value = 'Test123@';
    confPsw.value = 'Test123@2';
    oldPsw.dispatchEvent(new Event('input'));
    newPsw.dispatchEvent(new Event('input'));
    confPsw.dispatchEvent(new Event('input'));

    let saveButton = buttons[0];
    saveButton.click();
    expect(component.errorMessage).toBe(
      'La nuova password non coincide con il campo di conferma.'
    );
  });

  it('should send changes to server and return updated data', () => {
    //set fields
    oldPsw.value = 'Test123@';
    newPsw.value = 'Test123@2';
    confPsw.value = 'Test123@2';
    oldPsw.dispatchEvent(new Event('input'));
    newPsw.dispatchEvent(new Event('input'));
    confPsw.dispatchEvent(new Event('input'));
    //mock request
    spyOn(userManService, 'updatePsw').and.returnValue(of(psw));
    //send data
    let saveButton = buttons[0];
    saveButton.click();
    //expects
    expect(component.formGroup.valid).toBe(true);
  });

  it('should show an error message with internal server error', () => {
    //set fields
    oldPsw.value = 'Test123@';
    newPsw.value = 'Test123@2';
    confPsw.value = 'Test123@2';
    oldPsw.dispatchEvent(new Event('input'));
    newPsw.dispatchEvent(new Event('input'));
    confPsw.dispatchEvent(new Event('input'));
    //mock request
    spyOn(userManService, 'updatePsw').and.returnValue(
      throwError({ status: 500 })
    );
    //send data
    let saveButton = buttons[0];
    saveButton.click();
    //expects
    expect(component.errorMessage)
      .toBe(`Si è verificato un problema nell'operazione di modifica.
                         Riprova più tardi.`);
  });
});
