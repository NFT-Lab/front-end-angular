import { AuthenticationService } from './../authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  formGroup: FormGroup;
  errorMessage: string;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  login(): void {
    if(this.formGroup.valid){
      this.authenticationService.login(this.formGroup.value)
        .subscribe(
          res => {
            this.errorMessage = "";
            localStorage.setItem("User", JSON.stringify(res));
          },
          error => {
            if(error.status === 204)
              this.errorMessage = "Nessunca corrispondenza";
            if(error.status === 400){
              this.errorMessage = "Campi non compilati correttamente";
            }
          }
        );
    }
  }

}
