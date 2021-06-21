import { CategoriesService } from '../../_services/categories.service';
import { ModifyPswFormComponent } from '../modify-psw-form/modify-psw-form.component';
import { ModifyUserFormComponent } from '../modify-user-form/modify-user-form.component';
import { ModifyOperaFormComponent } from '../modify-opera-form/modify-opera-form.component';
import { NewOperaFormComponent } from '../new-opera-form/new-opera-form.component';
import { MatDialog } from '@angular/material/dialog';
import { OperaManagementService } from '../../_services/opera-management.service';
import { Component, OnInit } from '@angular/core';
import { Nft } from '@model/Nft';
import { OperaDetailsComponent } from '../opera-details/opera-details.component';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '@model/Category';
import { FilterSearchComponent } from 'src/app/_shared/filter-search/filter-search.component';

@Component({
  selector: 'app-opera-management',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  formGroup: FormGroup;
  operas: Nft[] = [];
  allCategories: Category[] = [];
  filteredOperas: Nft[] = [];
  userData = JSON.parse(localStorage.getItem('User') as string);
  page: number = 1;
  fileSystemPath: string = environment.fileSystemPath;

  constructor(
    private operaManService: OperaManagementService,
    private catService: CategoriesService,
    public modal: MatDialog
  ) {}

  ngOnInit(): void {
    this.getOperas();
    this.getCategories();
    this.initForm();
  }

  getOperas() {
    return this.operaManService.getOperas().subscribe((nft) => {
      this.operas = nft;

      this.operas.forEach((opera) => {
        let n = Math.floor(Math.random() * 15) + 1;
        opera.path = 'test' + n + '.jpeg';
      });
      //le prossime righe saranno da togliere e servono per testare con stoplight
      //che il filtro di ricerca funzioni
      //this.operas[0].categories.push({ id: 1, name: 'test' });
      //this.operas[2].categories.push({ id: 1, name: 'test' });
      //fine
      this.filteredOperas = [...this.operas];
    });
  }

  getCategories() {
    return this.catService.getCategories().subscribe((cats) => {
      this.allCategories = cats;
      //le prossime righe saranno da togliere e servono per testare con stoplight
      //che il filtro di ricerca funzioni
      //this.allCategories.push({ id: 1, name: 'test' });
      //fine
    });
  }

  getPath(opera: Nft) {
    return this.fileSystemPath + opera.path;
  }

  initForm() {
    this.formGroup = new FormGroup({
      categories: new FormControl(this.allCategories, [Validators.required]),
    });
  }
  /*
  search() {
    if (this.formGroup.valid) {
      let catChosen: Category[] = this.formGroup.controls.categories.value;
      let operaFiltered: Nft[] = [];
      let next: boolean = false;
      if (this.operas.length) {
        this.operas.forEach((opera) => {
          opera.categories.forEach((cat) => {
            next = false;
            for (let i = 0; i < catChosen.length && !next; i++) {
              if (cat.name === catChosen[i].name) {
                operaFiltered.push(opera);
                next = true;
              }
            }
          });
        });
      }
      this.filteredOperas = [...operaFiltered];
    }
  }*/

  clearFilters() {
    this.filteredOperas = [...this.operas];
  }

  openModifyUserData() {
    let modalRef = this.modal.open(ModifyUserFormComponent, {
      panelClass: 'dialog-responsive',
      data: this.userData,
    });
    modalRef.afterClosed().subscribe((user) => {
      if (user) {
        let fields = Object.keys(user);
        fields.forEach((field: any) => {
          this.userData[field] = user[field];
        });
      }
    });
  }

  openModifyUserPsw() {
    this.modal.open(ModifyPswFormComponent, {
      panelClass: 'dialog-responsive',
    });
  }

  openAddOperaModal(): void {
    let modalRef = this.modal.open(NewOperaFormComponent, {
      panelClass: 'dialog-responsive',
    });
    modalRef.afterClosed().subscribe((opera) => {
      if (opera) this.operas.push(opera);
    });
    this.filteredOperas = [...this.operas];
  }

  openDetailsOperaModal(opera: Nft) {
    this.modal.open(OperaDetailsComponent, {
      panelClass: 'dialog-responsive',
      data: opera,
    });
  }

  openModifyOperaModal(opera: Nft) {
    let modalRef = this.modal.open(ModifyOperaFormComponent, {
      panelClass: 'dialog-responsive',
      data: opera,
    });
    modalRef.afterClosed().subscribe((opera) => {
      if (opera) {
        let index = -1;
        this.operas.forEach((nft, i) => {
          if (nft.id === opera.id) index = i;
        });
        this.filteredOperas = [...this.operas];
      }
    });
  }

  filteredSearch(fs: Object): void {
    this.filteredOperas = [...this.operas];
    let filteredOperas: Nft[] = [];
    let filters = Object.keys(fs);
    let filtersValues: any = fs;
    let next: boolean = false;
    let ok: boolean = true;
    let k = 0;

    if (filters.length && this.operas.length) {
      this.operas.forEach((opera) => {
        k = 0;
        ok = true;
        filters.forEach((filter: any) => {
          if (filter === 'cat' && opera.categories.length) {
            opera.categories.forEach((cat) => {
              next = false;
              for (let i = 0; i < filtersValues.cat.length && !next; i++) {
                if (cat.name === filtersValues.cat[i].name) {
                  next = true;
                  k++;
                  ok = true;
                } else ok = false;
              }
            });
          }
          if (ok && filter === 'type') {
            if (filtersValues.type.includes(opera.type)) k++;
          }
        });
        if (k === filters.length) filteredOperas.push(opera);
      });
    }

    this.filteredOperas = [...filteredOperas];
  }

  openFilterSearchModal() {
    let modalRef = this.modal.open(FilterSearchComponent, {
      panelClass: 'dialog-responsive',
    });
    modalRef.afterClosed().subscribe((filters) => {
      if (filters) this.filteredSearch(filters);
    });
  }
}
