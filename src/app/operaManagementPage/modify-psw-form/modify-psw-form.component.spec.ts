import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPswFormComponent } from './modify-psw-form.component';

describe('ModifyPswFormComponent', () => {
  let component: ModifyPswFormComponent;
  let fixture: ComponentFixture<ModifyPswFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyPswFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyPswFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
