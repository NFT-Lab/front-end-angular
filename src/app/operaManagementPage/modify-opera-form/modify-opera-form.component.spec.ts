import { OperaManagementService } from '@service/opera-management.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Nft } from '@model/Nft';
import { of, throwError } from 'rxjs';
import { AppModule } from 'src/app/app.module';

import { ModifyOperaFormComponent } from './modify-opera-form.component';

describe('ModifyOperaFormComponent', () => {
  let component: ModifyOperaFormComponent;
  let fixture: ComponentFixture<ModifyOperaFormComponent>;
  let buttons: any;
  const opera: Nft = {
    id: 12,
    title: 'test',
    description: 'test',
    author: 'test',
    owner: 'test',
    price: 12,
    categories: [{ id: 1, name: 'test' }],
    type: 'test',
    currency: 'test',
    path: 'test',
  };

  const dialogMock = {
    close: () => {},
  };

  let operaManService: OperaManagementService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        OperaManagementService,
        { provide: MAT_DIALOG_DATA, useValue: opera },
        { provide: MatDialogRef, useValue: dialogMock },
      ],
      imports: [AppModule],
      declarations: [ModifyOperaFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyOperaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    buttons = Array.from(fixture.nativeElement.querySelectorAll('button'));
    operaManService = fixture.debugElement.injector.get(OperaManagementService);
  });

  it('dialog should be closed', () => {
    let spy = spyOn(component.modalRef, 'close').and.callThrough();
    component.closeModal();
    expect(spy).toHaveBeenCalled();
  });

  it('should send changes to server and get the opera update', () => {
    let saveButton = buttons[0];
    let name = fixture.nativeElement.querySelector(
      'input[formControlName=name]'
    );
    //check form is filled out
    expect(name.value).toBe('test');
    //mock request
    spyOn(operaManService, 'updateOpera').and.returnValue(of(opera));
    //send data
    saveButton.click();
  });

  it('should show an error message with internal server error', () => {
    let saveButton = buttons[0];
    //mock 500 error response
    spyOn(operaManService, 'updateOpera').and.returnValue(
      throwError({ status: 500 })
    );
    //send data
    saveButton.click();
    //expects
    expect(component.errorMessage)
      .toBe(`Si è verificato un problema nell'inserimento della
                tua opera. Riprova più tardi.`);
  });

  it('should show an error message with invalid form', () => {
    let saveButton = buttons[0];
    //put wrong input
    let name = fixture.nativeElement.querySelector(
      'input[formControlName=name]'
    );
    name.value = '';
    name.dispatchEvent(new Event('input'));
    //try to send data
    saveButton.click();
    //expects
    expect(component.formGroup.valid).toBe(false);
    expect(component.errorMessage).toBe(
      'Compila tutti i campi per inserire la tua opera.'
    );
  });
});
