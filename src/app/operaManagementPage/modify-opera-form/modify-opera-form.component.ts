import { Category } from '@model/Category';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Nft } from '@model/Nft';
import { OperaManagementService } from '@service/opera-management.service';
import { environment } from 'src/environments/environment';
import { NewOperaFormComponent } from '../new-opera-form/new-opera-form.component';

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
  types = ['Immagine', 'Video', 'Documento', 'Audio'];
  categories: Category[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) opera: Nft,
    private operaManService: OperaManagementService,
    public modalRef: MatDialogRef<ModifyOperaFormComponent>
  ) {
    this.nft = opera;
  }

  ngOnInit(): void {
    this.categories = this.nft.categories;
    this.initForm();
  }

  getPath() {
    return this.fileSystemPath + this.nft.path;
  }

  initForm() {
    this.formGroup = new FormGroup({
      name: new FormControl(this.nft.title, [Validators.required]),
      description: new FormControl(this.nft.description, [Validators.required]),
      type: new FormControl(this.types[0], [Validators.required]),
      categories: new FormControl(this.nft.categories, [Validators.required]),
      price: new FormControl(this.nft.price, [Validators.required]),
    });
  }

  updateOpera(): void {
    if (this.formGroup.valid) {
      let newNft = this.formGroup.value,
        modOpera = { ...this.nft };

      modOpera.title = newNft.name;
      modOpera.description = newNft.description;
      modOpera.type = newNft.type;
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
    this.modalRef.close();
  }
}
