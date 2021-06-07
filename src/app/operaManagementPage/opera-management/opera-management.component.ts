import { ModifyOperaFormComponent } from './../modify-opera-form/modify-opera-form.component';
import { NewOperaFormComponent } from './../new-opera-form/new-opera-form.component';
import { MatDialog } from '@angular/material/dialog';
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
  operas: Nft[];

  constructor(
    private operaManService: OperaManagementService,
    private addOperaModal: MatDialog //private operaDetailsModal: MatDialog
  ) {}

  ngOnInit(): void {
    this.getOperas();
  }

  getOperas() {
    return this.operaManService
      .getOperas()
      .subscribe((nft) => (this.operas = nft));
  }

  openAddOperaModal(): void {
    let modalRef = this.addOperaModal.open(NewOperaFormComponent, {
      width: '30%',
    });
    modalRef.afterClosed().subscribe((opera) => {
      if (opera) this.operas.push(opera);
    });
  }

  openDetailsperaModal(opera: Nft) {
    this.addOperaModal.open(OperaDetailsComponent, {
      width: '30%',
      data: opera,
    });
  }

  openModifyOperaModal(opera: Nft) {
    let modalRef = this.addOperaModal.open(ModifyOperaFormComponent, {
      width: '30%',
      data: opera,
    });
    modalRef.afterClosed().subscribe((opera) => {
      if (opera) {
        let index = -1;
        this.operas.forEach((nft, i) => {
          if (nft.id === opera.id) index = i;
        });
        this.operas[index] = opera;
      }
    });
  }
}
