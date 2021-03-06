import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '@model/User';
import { UserManagementService } from '@service/user-management.service';

@Component({
  selector: 'app-modify-user-form',
  templateUrl: './modify-user-form.component.html',
  styleUrls: ['./modify-user-form.component.css'],
})
export class ModifyUserFormComponent implements OnInit {
  formGroup: FormGroup;
  errorMessage: string;
  user: User;
  hide: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) user: User,
    private userModService: UserManagementService,
    public modalRef: MatDialogRef<ModifyUserFormComponent>
  ) {
    this.user = user;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      name: new FormControl(this.user.name, [Validators.required]),
      surname: new FormControl(this.user.surname, [Validators.required]),
      dob: new FormControl(this.user.dob, [Validators.required]),
      email: new FormControl(this.user.email, []),
      wallet: new FormControl(this.user.wallet, [
        Validators.required,
        Validators.pattern(/^0x[a-fA-F0-9]{40}$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        ),
      ]),
    });
  }

  getUserInfo(): any {
    return JSON.parse(localStorage.getItem('User') as string);
  }

  updateUser(): void {
    if (this.formGroup.valid) {
      let payload = this.formGroup.value,
        userInfo = this.getUserInfo(),
        id = userInfo.id;

      this.userModService.updateUserInfo(payload, id).subscribe(
        (res) => {
          if (res !== null) {
            localStorage['User'] = JSON.stringify(res);
            this.modalRef.close(res);
          }
        },
        () => {
          this.errorMessage = `Si è verificato un problema nell'operazione di modifica.
                         Riprova più tardi.`;
        }
      );
    } else {
      this.errorMessage = `Tutti i campi devono essere compilati.`;
    }
  }

  closeModal(): void {
    this.modalRef.close();
  }
}
