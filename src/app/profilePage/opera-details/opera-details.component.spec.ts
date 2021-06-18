import { AppModule } from 'src/app/app.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { OperaDetailsComponent } from './opera-details.component';

describe('OperaDetailsComponent', () => {
  let component: OperaDetailsComponent;
  let fixture: ComponentFixture<OperaDetailsComponent>;

  const dialogMock = {
    close: () => {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogMock },
      ],
      imports: [AppModule],
      declarations: [OperaDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('dialog should be closed', () => {
    let spy = spyOn(component.modalRef, 'close').and.callThrough();
    component.getColor(1);
    component.getColor(2);
    component.getColor(3);
    component.getColor(4);
    component.getColor(5);
    component.getColor(6);
    component.getColor(0);
    component.closeModal();
    expect(spy).toHaveBeenCalled();
  });
});
