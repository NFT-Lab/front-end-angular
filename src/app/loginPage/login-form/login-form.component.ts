import { AuthenticationService } from '@service/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  formGroup: FormGroup;
  errorMessage: string;
  hide: boolean = true;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        ),
      ]),
    });
  }

  login(): void {
    if (this.formGroup.valid) {
      this.authenticationService.login(this.formGroup.value).subscribe(
        (res) => {
          this.errorMessage = '';
          localStorage.setItem('User', JSON.stringify(res));
          this.router.navigateByUrl('');
        },
        (error) => {
          if (error.status === 204)
            this.errorMessage = 'Nessunca corrispondenza';
          if (error.status === 400) {
            this.errorMessage = 'Campi non compilati correttamente';
          }
        }
      );
    } else if (this.formGroup.controls.email.invalid) {
      this.errorMessage = `Formato e-mail non valido. Assicurati di
          averla inserita correttamente.`;
    } else {
      this.errorMessage = `La password deve contere almeno 8 caratteri,
        una lettera minuscola e maiuscola ed un carattere speciale.`;
    }
  }
}
