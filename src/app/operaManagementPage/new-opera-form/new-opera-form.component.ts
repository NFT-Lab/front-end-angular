import { Category } from './../../_models/Category';
import { CategoriesService } from './../../_services/categories.service';
import { OperaManagementService } from './../../_services/opera-management.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-new-opera-form',
  templateUrl: './new-opera-form.component.html',
  styleUrls: ['./new-opera-form.component.css'],
})
export class NewOperaFormComponent implements OnInit {
  formGroup: FormGroup;
  errorMessage: string;
  path: string = '';
  uploadLabel: string = 'Carica la tua opera';
  fileName: string;
  categories: Category[] = [];
  type: string;
  private file: File;

  constructor(
    private operaManService: OperaManagementService,
    private catService: CategoriesService,
    public modalRef: MatDialogRef<NewOperaFormComponent>
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.initForm();
  }

  getCategories() {
    return this.catService
      .getCategories()
      .subscribe((cat) => (this.categories = cat));
  }

  initForm() {
    this.formGroup = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      categories: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
    });
  }

  selectFile(e: Event) {
    let target = e.target as HTMLInputElement;
    if (target.files) {
      this.fileName = target.files[0].name;
      this.file = target.files[0];
      if (target.files[0].type.includes('image')) {
        this.type = 'Immagine';
        let reader = new FileReader();
        reader.readAsDataURL(target.files[0]);
        reader.onload = (event: any) => {
          this.path = event.target.result;
        };
      } else {
        this.path = 'assets/document.png';
      }
    }

    this.uploadLabel = 'Modifica';
  }

  addOpera(): void {
    if (this.formGroup.valid && this.path !== '') {
      let newNft = this.formGroup.value,
        user = JSON.parse(localStorage.getItem('User') as string);

      newNft.currency = 'ETH';
      newNft.owner = newNft.author = user.name || 'test';
      newNft.price = Number(newNft.price);

      console.log(newNft);

      this.operaManService.addOpera(newNft, this.file).subscribe(
        (res) => {
          this.modalRef.close(res);
        },
        () => {
          this.errorMessage = `Si è verificato un problema nell'inserimento della
                tua opera. Riprova più tardi.`;
        }
      );
    } else {
      this.errorMessage = `Insirisci un'opera e compila tutti i campi per continuare.`;
    }
  }

  closeModal(): void {
    this.modalRef.close();
  }
}
