import { Psw } from '@model/Psw';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserManagementService } from '@service/user-management.service';

@Component({
  selector: 'app-modify-psw-form',
  templateUrl: './modify-psw-form.component.html',
  styleUrls: ['./modify-psw-form.component.css'],
})
export class ModifyPswFormComponent implements OnInit {
  formGroup: FormGroup;
  errorMessage: string;
  hide: boolean;

  constructor(
    private userModService: UserManagementService,
    public modalRef: MatDialogRef<ModifyPswFormComponent>
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    let validators = [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
      ),
    ];
    this.formGroup = new FormGroup({
      oldPassword: new FormControl('', validators),
      newPassword: new FormControl('', validators),
      confirmPsw: new FormControl('', validators),
    });
  }

  updatePsw(): void {
    let differentFromOld: boolean =
        this.formGroup.controls.oldPassword.value !==
        this.formGroup.controls.newPassword.value,
      equalWithinNew: boolean =
        this.formGroup.controls.newPassword.value ===
        this.formGroup.controls.confirmPsw.value;

    if (this.formGroup.valid && differentFromOld && equalWithinNew) {
      let user = JSON.parse(localStorage.getItem('User') as string),
        payload = this.formGroup.value;

      payload.email = user.email;

      this.userModService.updatePsw(payload).subscribe(
        (res) => {
          this.modalRef.close(res);
        },
        () => {
          this.errorMessage = `Si è verificato un problema nell'operazione di modifica.
                         Riprova più tardi.`;
        }
      );
    } else if (!this.formGroup.valid) {
      this.errorMessage = 'Compila tutti i campi.';
    } else if (!equalWithinNew) {
      this.errorMessage = `La nuova password non coincide con il campo di conferma.`;
    } else {
      this.errorMessage = `La nuova password deve essere diversa da quella attuale.`;
    }
  }

  closeModal(): void {
    this.modalRef.close();
  }
}
