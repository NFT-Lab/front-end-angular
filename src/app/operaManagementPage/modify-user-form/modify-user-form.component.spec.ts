import { User } from '@model/User';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserManagementService } from '@service/user-management.service';
import { AppModule } from 'src/app/app.module';

import { ModifyUserFormComponent } from './modify-user-form.component';
import { of, throwError } from 'rxjs';

describe('ModifyUserFormComponent', () => {
  let component: ModifyUserFormComponent;
  let fixture: ComponentFixture<ModifyUserFormComponent>;
  let buttons: any, psw: any;
  const user: User = {
    dob: new Date(1997, 5, 12),
    name: 'test',
    surname: 'test',
    wallet: '0xEd1bB395f00B22454c22B6c76b645657c739D3cc',
    email: 'test@test.it',
  };

  const dialogMock = {
    close: () => {},
  };

  let userManService: UserManagementService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        UserManagementService,
        { provide: MAT_DIALOG_DATA, useValue: user },
        { provide: MatDialogRef, useValue: dialogMock },
      ],
      imports: [AppModule],
      declarations: [ModifyUserFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    //select modal buttons
    buttons = Array.from(fixture.nativeElement.querySelectorAll('button'));
    //track service
    userManService = fixture.debugElement.injector.get(UserManagementService);
  });

  it('dialog should be closed', () => {
    let spy = spyOn(component.modalRef, 'close').and.callThrough();
    component.closeModal();
    expect(spy).toHaveBeenCalled();
  });

  it('should send changes to server and get updated user info', () => {
    let saveButton = buttons[0];
    let name = fixture.nativeElement.querySelector(
      'input[formControlName=name]'
    );
    //check form is filled out
    expect(name.value).toBe('test');

    fixture.whenStable().then(() => {
      psw = fixture.nativeElement.querySelector(
        'input[formControlName=password]'
      );
      psw.value = 'Test123@';
      psw.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      //expect form valid
      expect(component.formGroup.valid).toBe(true);
      expect(saveButton.disabled).toBe(false);
      //mock response
      spyOn(userManService, 'updateUserInfo').and.returnValue(of(user));
      //send data
      saveButton.click();
    });
  });

  it('should show an error message with invalid form', () => {
    let saveButton = buttons[0];
    expect(component.formGroup.valid).toBe(false);

    fixture.whenStable().then(() => {
      //put wrong input
      let name = fixture.nativeElement.querySelector(
        'input[formControlName=name]'
      );
      name.value = '';
      name.dispatchEvent(new Event('input'));

      psw = fixture.nativeElement.querySelector(
        'input[formControlName=password]'
      );
      psw.value = 'Test123@';
      psw.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      //send data
      saveButton.click();
      //expects
      expect(component.formGroup.valid).toBe(false);
      expect(component.errorMessage).toBe(
        'Tutti i campi devono essere compilati.'
      );
    });
  });

  it('should show an error message with internal server error', () => {
    let saveButton = buttons[0];
    expect(component.formGroup.valid).toBe(false);
    //wait for enabling button

    fixture.whenStable().then(() => {
      psw = fixture.nativeElement.querySelector(
        'input[formControlName=password]'
      );
      psw.value = 'Test123@';
      psw.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      //expect form valid
      expect(component.formGroup.valid).toBe(true);
      //mock 500 error response
      spyOn(userManService, 'updateUserInfo').and.returnValue(
        throwError({ status: 500 })
      );
      //send data
      saveButton.click();
      //expects
      /*
      expect(component.errorMessage)
        .toBe(`Si è verificato un problema nell'operazione di modifica.
                         Riprova più tardi.`);*/
    });
  });
});
