import { OperaManagementService } from './../../_services/opera-management.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Nft } from '@model/Nft';

@Component({
  selector: 'app-new-opera-form',
  templateUrl: './new-opera-form.component.html',
  styleUrls: ['./new-opera-form.component.css'],
})
export class NewOperaFormComponent implements OnInit {
  formGroup: FormGroup;
  button: boolean;
  private operas: Nft[];
  errorMessage: string;

  constructor(private operaManService: OperaManagementService) {}

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

  setTrue(): void {
    if (!this.button) this.button = true;
    else this.button = false;
  }

  addOpera(): void {
    //aggiungere controlli
    this.operaManService.addOpera(this.formGroup.value).subscribe(
      (res) => {
        this.operas.push(res);
      },
      (error) => {
        if (error.status === 500)
          this.errorMessage = `Si è verificato un problema nell'inserimento della
                tua opera. Riprova più tardi`;
      }
    );
  }
}
