import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OperaManagementService } from './../../_services/opera-management.service';
import { Component, OnInit } from '@angular/core';
import { Nft } from '@model/Nft';

@Component({
  selector: 'app-opera-management',
  templateUrl: './opera-management.component.html',
  styleUrls: ['./opera-management.component.css'],
})
export class OperaManagementComponent implements OnInit {
  operas: Nft[];

  constructor(private operaManService: OperaManagementService) {}

  ngOnInit(): void {
    this.getOperas();
  }

  getOperas() {
    return this.operaManService
      .getOperas()
      .subscribe((nft) => (this.operas = nft));
  }
}
