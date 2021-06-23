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
  //array di ID di opere caricate in blockchain
  photos: string[] = [
    'QmX5FkTotxKRziu5a7NXz16YeHrVgYw98RzTgNWvi8HmDC',
    'QmUZr5giEkQynVP4whjkrPA5x9HjfmonCt2j5WCCJ6GJYt',
    'QmdDN19DFWsGAL5hsdYDiPWLJpcNnezEqcMai8UnWayTCy',
    'QmUoxQnAHehMEKH1CCbr1bu69P4r79kPXRKFqn6v3Pyret',
    'QmNe7jwQqawJ9TNouzBwDLfS294SxNo7FEuuKBkkpRRFHh',
    'QmRMEwa9jLv2iNxrpfZ8Z2bNMTZEFeyUVnt6fF5Xenk7Ms',
    'QmbHx7zHgibMF9ktjaRm5dDT3bRAtqa7EVBPJ8jTvpLahe',
    'QmWjHc9zb5ojPsjA43B3SFyKRPqd9Mc57R9EnTCgduyNzv',
    'Qmb13ALEkqXtVXGxCSXJvAQNVwytCFcr5DT6jcrXuUGjat',
    'QmUZKcyxFm82CpsuRxkentY3zw8dRxGxHni8ggDuxQQYDP',
  ];

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
        let n = Math.floor(Math.random() * 9) + 1;
        opera.path = 'https://cloudflare-ipfs.com/ipfs/' + this.photos[n];
      });
      this.filteredOperas = [...this.operas];
    });
  }

  getPath(opera: Nft): string {
    return 'url(' + opera.path + ')';
  }

  getCategories() {
    return this.catService.getCategories().subscribe((cats) => {
      this.allCategories = cats;
    });
  }

  initForm() {
    this.formGroup = new FormGroup({
      categories: new FormControl(this.allCategories, [Validators.required]),
    });
  }

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
        this.operas[index] = opera;
        this.filteredOperas = [...this.operas];
      }
    });
  }

  filteredSearch(fs: Object): void {
    this.filteredOperas = [...this.operas];
    let filteredOperas: Nft[] = [];
    let filters = Object.keys(fs);
    let filtersValues: any = fs;
    let ok: boolean;
    let k: number;

    if (filters.length && this.operas.length) {
      //scorro tutte le opere
      this.operas.forEach((opera) => {
        k = 0;
        ok = true;
        //scorro tutti i filtri
        filters.forEach((filter: any) => {
          if (filter === 'cat' && opera.categories.length) {
            opera.categories.forEach((cat) => {
              for (let i = 0; i < filtersValues.cat.length; i++) {
                //se matcho una categoria aumento il contatore
                if (cat.name === filtersValues.cat[i].name) k++;
              }
            });
            //se il numero di match != categorie che cerco mi fermo
            if (k !== filtersValues.cat.length) ok = false;
          }

          if (ok && filter === 'type') {
            if (!filtersValues.type.includes(opera.type)) ok = false;
          }
        });
        if (ok) filteredOperas.push(opera);
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
