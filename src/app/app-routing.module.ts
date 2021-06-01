import { OperaManagementComponent } from './operaManagementPage/opera-management/opera-management.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './loginPage/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'nft/user', component: OperaManagementComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
