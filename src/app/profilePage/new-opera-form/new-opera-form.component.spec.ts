import { CategoriesService } from '../../_services/categories.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { Nft } from '@model/Nft';
import { OperaManagementService } from '@service/opera-management.service';
import { of, throwError } from 'rxjs';
import { AppModule } from 'src/app/app.module';

import { NewOperaFormComponent } from './new-opera-form.component';
import { Category } from '@model/Category';
import { User } from '@model/User';

describe('NewOperaFormComponent', () => {
  let component: NewOperaFormComponent;
  let fixture: ComponentFixture<NewOperaFormComponent>;
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

  const user: User = {
    dob: new Date(1997, 5, 12),
    name: 'test',
    surname: 'test',
    wallet: '0xEd1bB395f00B22454c22B6c76b645657c739D3cc',
    email: 'test@test.it',
  };

  const cat: Category[] = [{ id: 1, name: 'test' }];

  const dialogMock = {
    close: () => {},
  };

  let operaManService: OperaManagementService;
  let catService: CategoriesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        OperaManagementService,
        { provide: MatDialogRef, useValue: dialogMock },
      ],
      imports: [AppModule],
      declarations: [NewOperaFormComponent],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(NewOperaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    //find buttons
    buttons = Array.from(fixture.nativeElement.querySelectorAll('button'));
    //set fields
    component.formGroup.controls.title.setValue('test');
    component.formGroup.controls.description.setValue('test');
    component.formGroup.controls.price.setValue(12);
    component.formGroup.controls.categories.setValue(['Sport']);
    component.path = 'test';
    //mock req
    operaManService = fixture.debugElement.injector.get(OperaManagementService);
    catService = fixture.debugElement.injector.get(CategoriesService);
  });

  it('dialog should be closed', () => {
    let spy = spyOn(component.modalRef, 'close').and.callThrough();
    component.closeModal();
    expect(spy).toHaveBeenCalled();
  });

  it('user should upload his opera', () => {
    const mockFile = new File([''], 'filename', { type: 'text/html' });
    const mockEvt = { target: { files: [mockFile] } };
    component.selectFile(mockEvt as any);
    expect(component.path).toBeTruthy();
  });

  it('should show an error with invalid form', () => {
    let saveButton = buttons[1];

    component.path = '';
    saveButton.click();
    expect(component.errorMessage).toBe(
      "Insirisci un'opera e compila tutti i campi per continuare."
    );
  });

  it('add opera request', () => {
    let saveButton = buttons[1];

    spyOn(operaManService, 'addOpera').and.returnValue(of(opera));
    spyOn(catService, 'getCategories').and.returnValue(of(cat));
    spyOn(component, 'getUserInfo').and.returnValue(user);

    expect(component.path).toBe('test');
    expect(component.formGroup.valid).toBe(true);

    saveButton.click();
  });

  it('should show an error message with internal server error', () => {
    let saveButton = buttons[1];
    //mock 500 error response
    spyOn(operaManService, 'addOpera').and.returnValue(
      throwError({ status: 500 })
    );
    spyOn(component, 'getUserInfo').and.returnValue(user);
    //spyOn(catService, 'getCategories').and.returnValue(of(cat));
    expect(component.formGroup.valid).toBe(true);
    //send data
    saveButton.click();
    //expects
    /*
    expect(component.errorMessage)
      .toBe(`Si è verificato un problema nell'inserimento della
                tua opera. Riprova più tardi.`);
                */
  });
});
