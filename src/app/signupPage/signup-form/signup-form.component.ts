import { SignupService } from './../../_services/signup.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent implements OnInit {
  formGroup: FormGroup;
  errorMessage: string;
  hide: boolean;

  constructor(private signupService: SignupService, private router: Router) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        ),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      wallet: new FormControl('', [
        Validators.required,
        //example: 0xEd1bB395f00B22454c22B6c76b645657c739D3cc
        Validators.pattern(/^0x[a-fA-F0-9]{40}$/),
      ]),
    });
  }

  checkPassword(): boolean {
    let a = this.formGroup.get('password'),
      b = this.formGroup.get('confirmPassword');
    return a?.value === b?.value;
  }

  checkDob(): boolean {
    let dob = new Date(this.formGroup.controls.dob.value);
    var ageDifMs = Date.now() - dob.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch

    return Math.abs(ageDate.getUTCFullYear() - 1970) >= 18;
  }

  signup(): void {
    if (this.formGroup.valid && this.checkPassword() && this.checkDob()) {
      let payload = this.formGroup.value;
      delete payload.confirmPassword;
      this.signupService.signup(this.formGroup.value).subscribe(
        (res) => {
          this.errorMessage = '';
          localStorage.setItem('User', JSON.stringify(res));
          this.router.navigateByUrl('/user');
        },
        (error) => {
          if (error.status === 409)
            this.errorMessage = 'Indirizzo e-mail già registrato nel sistema.';
          else if (error.status === 400)
            this.errorMessage = 'Campi non compilati correttamente.';
          else if (error.status === 500)
            this.errorMessage =
              'Non è stato possibile registrarti. Riprova più tardi.';
        }
      );
    } else if (this.formGroup.controls.email.invalid) {
      this.errorMessage = `Formato e-mail non valido. Assicurati di
          averla inserita correttamente.`;
    } else if (!this.checkDob()) {
      this.errorMessage = 'Devi essere maggiorenne per registrarti';
    } else if (!this.checkPassword()) {
      this.errorMessage = 'Le password non coincidono.';
    } else if (
      this.formGroup.controls.password.invalid ||
      this.formGroup.controls.confirmPassword.invalid
    ) {
      this.errorMessage = `La password deve contere almeno 8 caratteri,
        una lettera minuscola e maiuscola ed un carattere speciale.`;
    } else {
      this.errorMessage = `Indirizzo del wallet non corretto: deve contenere 40 caratteri
                alfanumerici, tra 0 e 9 e tra A ed F, ed iniziare per "0x".`;
    }
  }
}
