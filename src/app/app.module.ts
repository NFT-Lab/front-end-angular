import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginFormComponent } from './loginPage/login-form/login-form.component';
import { LoginComponent } from './loginPage/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OperaManagementComponent } from './operaManagementPage/opera-management/opera-management.component';
import { NewOperaFormComponent } from './operaManagementPage/new-opera-form/new-opera-form.component';
import { HeaderComponent } from './_shared/header/header.component';

const materialModules = [
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatIconModule,
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    [...materialModules],
  ],
  entryComponents: [NewOperaFormComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
