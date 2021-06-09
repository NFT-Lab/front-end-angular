import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Nft } from '@model/Nft';

@Component({
  selector: 'app-opera-details',
  templateUrl: './opera-details.component.html',
  styleUrls: ['./opera-details.component.css'],
})
export class OperaDetailsComponent {
  nft: Nft;
  constructor(
    @Inject(MAT_DIALOG_DATA) opera: Nft,
    private modalRef: MatDialogRef<OperaDetailsComponent>
  ) {
    this.nft = opera;
  }

  getColor() {
    let colors = [
      '#1f75fe33',
      '#1ffe3233',
      '#feb01f33',
      '#fe1f1f33',
      '#eb1ffe33',
      '#0c357733',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  closeModal(): void {
    this.modalRef.close();
  }
}
