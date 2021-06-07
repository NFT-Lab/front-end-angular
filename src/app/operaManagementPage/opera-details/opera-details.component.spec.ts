import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperaDetailsComponent } from './opera-details.component';

describe('OperaDetailsComponent', () => {
  let component: OperaDetailsComponent;
  let fixture: ComponentFixture<OperaDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperaDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
