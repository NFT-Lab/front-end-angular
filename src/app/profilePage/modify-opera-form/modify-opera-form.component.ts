import { CategoriesService } from './../../_services/categories.service';
import { Category } from '@model/Category';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Nft } from '@model/Nft';
import { OperaManagementService } from '@service/opera-management.service';
import { environment } from 'src/environments/environment';
import { Type } from '@model/Utils';
import { TypeToShow } from '@model/Utils';

@Component({
  selector: 'app-modify-opera-form',
  templateUrl: './modify-opera-form.component.html',
  styleUrls: ['./modify-opera-form.component.css'],
})
export class ModifyOperaFormComponent implements OnInit {
  formGroup: FormGroup;
  errorMessage: string;
  path: string = '';
  uploadLabel: string = 'Modifica';
  fileName: string;
  fileSystemPath: string = environment.fileSystemPath;
  nft: Nft;
  categories: Category[] = [];
  selectedCategories: Category[] = [];
  close: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) opera: Nft,
    private operaManService: OperaManagementService,
    private catService: CategoriesService,
    public modalRef: MatDialogRef<ModifyOperaFormComponent>
  ) {
    this.close = false;
    this.nft = opera;
    this.selectedCategories = this.nft.categories;
  }

  ngOnInit(): void {
    this.categories = this.nft.categories;
    this.initForm();
    this.getCategories();
  }

  getCategories() {
    return this.catService
      .getCategories()
      .subscribe((cat) => (this.categories = cat));
  }

  getPath() {
    return this.fileSystemPath + this.nft.path;
  }

  initForm() {
    this.formGroup = new FormGroup({
      name: new FormControl(this.nft.title, [Validators.required]),
      description: new FormControl(this.nft.description, [Validators.required]),
      type: new FormControl(TypeToShow[this.nft.type], []),
      categories: new FormControl(this.categories, [Validators.required]),
      price: new FormControl(this.nft.price, [Validators.required]),
    });
    //let cats = this.formGroup.controls.categories as any;
    //cats.updateValue(this.selectedCategories);
  }

  updateOpera(): void {
    if (this.formGroup.valid && !this.close) {
      let newNft = this.formGroup.value,
        modOpera = { ...this.nft };

      modOpera.title = newNft.name;
      modOpera.description = newNft.description;
      modOpera.type = Type[newNft.type];
      modOpera.categories = newNft.categories;
      modOpera.price = Number(newNft.price);

      this.operaManService.updateOpera(modOpera as Nft).subscribe(
        (res) => {
          this.modalRef.close(res);
        },
        () => {
          this.errorMessage = `Si è verificato un problema nell'inserimento della
                tua opera. Riprova più tardi.`;
        }
      );
    } else {
      this.errorMessage = `Compila tutti i campi per inserire la tua opera.`;
    }
  }

  closeModal(): void {
    this.close = true;
    this.modalRef.close();
  }
}