import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { OperaManagementService } from '@service/opera-management.service';
import { AppModule } from 'src/app/app.module';

import { NewOperaFormComponent } from './new-opera-form.component';

describe('NewOperaFormComponent', () => {
  let component: NewOperaFormComponent;
  let fixture: ComponentFixture<NewOperaFormComponent>;
  let selects: any, buttons: any;

  const dialogMock = {
    close: () => {},
  };

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
    /*
    component.formGroup.controls.name.setValue('test');
    selects = Array.from(
      fixture.debugElement.queryAll(By.directive(MatSelect))
    );
    expect(selects.length).toBe(2);
    selects[0].componentInstance.value = ['test'];
    selects[1].componentInstance.value = ['test'];

    expect(component.formGroup.controls.categories.valid).toBe(true);*/
  });

  it('dialog should be closed', () => {
    let spy = spyOn(component.modalRef, 'close').and.callThrough();
    component.closeModal();
    expect(spy).toHaveBeenCalled();
  });

  it('user should upload his opera', () => {
    const mockFile = new File([''], 'filename', { type: 'text/html' });
    const mockEvt = { target: { files: [mockFile] } };
    /*
    const mockReader: FileReader = jasmine.createSpyObj('FileReader', [
      'readAsDataURL',
      'onload',
    ]);
    spyOn(component, 'selectFile').and.returnValue(mockReader);*/
    component.selectFile(mockEvt as any);
    expect(component.path).toBeTruthy();
  });

  it('call', () => {
    const mockFile = new File([''], 'filename', { type: 'text/html' });
    const mockEvt = { target: { files: [mockFile] } };
    //
    component.selectFile(mockEvt as any);
    expect(component.path).toBeTruthy();
    let saveButton = buttons[0];
    //saveButton.click();
    //expect(type.value).toBe('test');
  });
});
