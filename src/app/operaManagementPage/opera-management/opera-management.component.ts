import { ModifyPswFormComponent } from './../modify-psw-form/modify-psw-form.component';
import { ModifyUserFormComponent } from './../modify-user-form/modify-user-form.component';
import { ModifyOperaFormComponent } from './../modify-opera-form/modify-opera-form.component';
import { NewOperaFormComponent } from './../new-opera-form/new-opera-form.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OperaManagementService } from './../../_services/opera-management.service';
import { Component, OnInit } from '@angular/core';
import { Nft } from '@model/Nft';
import { OperaDetailsComponent } from '../opera-details/opera-details.component';

@Component({
  selector: 'app-opera-management',
  templateUrl: './opera-management.component.html',
  styleUrls: ['./opera-management.component.css'],
})
export class OperaManagementComponent implements OnInit {
  operas: Nft[] = [];
  userData = JSON.parse(localStorage.getItem('User') || '{}');
  page: number = 1;

  constructor(
    private operaManService: OperaManagementService,
    public addOperaModal: MatDialog //private operaDetailsModal: MatDialog
  ) {}

  ngOnInit(): void {
    this.getOperas();
  }

  getOperas() {
    return this.operaManService
      .getOperas()
      .subscribe((nft) => (this.operas = nft));
  }

  openModifyUserData() {
    let modalRef = this.addOperaModal.open(ModifyUserFormComponent, {
      panelClass: 'dialog-responsive',
      data: this.userData,
    });

    modalRef.afterClosed().subscribe((user) => {
      if (user) {
        let fields = Object.keys(user);
        fields.forEach((field: any) => {
          this.userData[field] = user[field];
        });
      }
    });
  }

  openModifyUserPsw() {
    this.addOperaModal.open(ModifyPswFormComponent, {
      panelClass: 'dialog-responsive',
    });
  }

  openAddOperaModal(): void {
    let modalRef = this.addOperaModal.open(NewOperaFormComponent, {
      panelClass: 'dialog-responsive',
    });
    modalRef.afterClosed().subscribe((opera) => {
      if (opera) this.operas.push(opera);
    });
  }

  openDetailsOperaModal(opera: Nft) {
    this.addOperaModal.open(OperaDetailsComponent, {
      panelClass: 'dialog-responsive',
      data: opera,
    });
  }

  openModifyOperaModal(opera: Nft) {
    let modalRef = this.addOperaModal.open(ModifyOperaFormComponent, {
      panelClass: 'dialog-responsive',
      data: opera,
    });
    modalRef.afterClosed().subscribe((opera) => {
      if (opera) {
        let index = -1;
        this.operas.forEach((nft, i) => {
          if (nft.id === opera.id) index = i;
        });
      }
    });
  }
}
