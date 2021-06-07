import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Nft } from '@model/Nft';

@Component({
  selector: 'app-opera-details',
  templateUrl: './opera-details.component.html',
  styleUrls: ['./opera-details.component.css'],
})
export class OperaDetailsComponent {
  nft: Nft;
  constructor(@Inject(MAT_DIALOG_DATA) opera: Nft) {
    this.nft = opera;
  }
}
