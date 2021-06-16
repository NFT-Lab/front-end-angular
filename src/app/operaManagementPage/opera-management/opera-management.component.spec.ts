import { AppModule } from 'src/app/app.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperaManagementComponent } from './opera-management.component';
import { Nft } from '@model/Nft';
import { of } from 'rxjs';
import { ModifyOperaFormComponent } from '../modify-opera-form/modify-opera-form.component';
import { MatDialogRef } from '@angular/material/dialog';
import { Category } from '@model/Category';
import { OperaManagementService } from '@service/opera-management.service';
import { CategoriesService } from '@service/categories.service';

describe('OperaManagementComponent', () => {
  /*
  let component: OperaManagementComponent;
  let fixture: ComponentFixture<OperaManagementComponent>;

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

  const cat: Category[] = [{ id: 1, name: 'test' }];

  let operaManService: OperaManagementService;
  let catService: CategoriesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [OperaManagementComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperaManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    //mock req
    operaManService = fixture.debugElement.injector.get(OperaManagementService);
    catService = fixture.debugElement.injector.get(CategoriesService);
  });

  it('should create dialogs and return data', () => {
    expect(component).toBeTruthy();

    spyOn(operaManService, 'addOpera').and.returnValue(of(opera));
    spyOn(catService, 'getCategories').and.returnValue(of(cat));

    spyOn(component.modal, 'open').and.returnValue({
      afterClosed: () => of(opera),
    } as MatDialogRef<typeof ModifyOperaFormComponent>);

    component.openAddOperaModal();
    component.openModifyOperaModal(opera);
    component.openDetailsOperaModal(opera);
    component.openModifyUserData();
    component.openModifyUserPsw();
  });
  */
});
