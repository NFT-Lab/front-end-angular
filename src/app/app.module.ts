import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxPaginationModule } from 'ngx-pagination';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginFormComponent } from './loginPage/login-form/login-form.component';
import { LoginComponent } from './loginPage/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OperaManagementComponent } from './operaManagementPage/opera-management/opera-management.component';
import { NewOperaFormComponent } from './operaManagementPage/new-opera-form/new-opera-form.component';
import { HeaderComponent } from './_shared/header/header.component';
import { OperaDetailsComponent } from './operaManagementPage/opera-details/opera-details.component';
import { ModifyOperaFormComponent } from './operaManagementPage/modify-opera-form/modify-opera-form.component';
import { FooterComponent } from './_shared/footer/footer.component';
import { SignUpComponent } from './signupPage/sign-up/sign-up.component';
import { SignupFormComponent } from './signupPage/signup-form/signup-form.component';

const materialModules = [
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatIconModule,
  MatDividerModule,
  MatListModule,
  MatMenuModule,
  MatSelectModule,
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LoginFormComponent,
    OperaManagementComponent,
    NewOperaFormComponent,
    HeaderComponent,
    OperaDetailsComponent,
    ModifyOperaFormComponent,
    FooterComponent,
    SignUpComponent,
    SignupFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxPaginationModule,
    [...materialModules],
  ],
  entryComponents: [NewOperaFormComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
