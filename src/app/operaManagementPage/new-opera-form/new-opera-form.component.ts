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
  path: string;
  uploadLabel: string = 'Carica la tua opera';
  fileName: string;
  private file: File;

  constructor(
    private operaManService: OperaManagementService,
    private modalRef: MatDialogRef<NewOperaFormComponent>
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
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
        let reader = new FileReader();
        reader.readAsDataURL(target.files[0]);
        reader.onload = (event: any) => {
          this.path = event.target.result;
        };
      } else {
        this.path = './../../../assets/document.png';
      }
    }

    this.uploadLabel = 'Modifica';
  }

  addOpera(): void {
    if (this.formGroup.valid) {
      let newNft = this.formGroup.value,
        user = JSON.parse(localStorage.getItem('User') || '{}');

      newNft.currency = 'ETH';
      newNft.owner = newNft.author = user.name;
      newNft.categories = [];
      newNft.price = Number(newNft.price);

      this.operaManService.addOpera(newNft, this.file).subscribe(
        (res) => {
          this.modalRef.close(res);
        },
        (error) => {
          if (error.status === 500)
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
