import { SignUpComponent } from './signupPage/sign-up/sign-up.component';
import { OperaManagementComponent } from './operaManagementPage/opera-management/opera-management.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './loginPage/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'user', component: OperaManagementComponent },
  { path: 'signup', component: SignUpComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
