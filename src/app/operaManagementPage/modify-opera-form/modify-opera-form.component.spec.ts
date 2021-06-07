import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyOperaFormComponent } from './modify-opera-form.component';

describe('ModifyOperaFormComponent', () => {
  let component: ModifyOperaFormComponent;
  let fixture: ComponentFixture<ModifyOperaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyOperaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyOperaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
