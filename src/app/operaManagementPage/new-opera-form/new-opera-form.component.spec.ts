import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOperaFormComponent } from './new-opera-form.component';

describe('NewOperaFormComponent', () => {
  let component: NewOperaFormComponent;
  let fixture: ComponentFixture<NewOperaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewOperaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOperaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
