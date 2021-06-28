import { AppModule } from 'src/app/app.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { Nft } from '@model/Nft';
import { of } from 'rxjs';
import { ModifyOperaFormComponent } from '../modify-opera-form/modify-opera-form.component';
import { MatDialogRef } from '@angular/material/dialog';
import { Category } from '@model/Category';
import { OperaManagementService } from '@service/opera-management.service';
import { CategoriesService } from '@service/categories.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('OperaManagementComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

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
      imports: [AppModule, HttpClientTestingModule],
      declarations: [ProfileComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
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

    component.getPath(opera);
    component.clearFilters();
    component.filteredSearch({
      cat: [{ id: 1, name: 'test' }],
      type: ['test'],
    });
    component.openAddOperaModal();
    component.openModifyOperaModal(opera);
    component.openDetailsOperaModal(opera);
    component.openModifyUserData();
    component.openModifyUserPsw();
    component.openFilterSearchModal();
  });
});
