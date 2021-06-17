import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Nft } from '@model/Nft';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-opera-details',
  templateUrl: './opera-details.component.html',
  styleUrls: ['./opera-details.component.css'],
})
export class OperaDetailsComponent {
  nft: Nft;
  fileSystemPath: string = environment.fileSystemPath;
  constructor(
    @Inject(MAT_DIALOG_DATA) opera: Nft,
    public modalRef: MatDialogRef<OperaDetailsComponent>
  ) {
    this.nft = opera;
  }

  getPath() {
    return this.fileSystemPath + this.nft.path;
  }

  getColor(cat: number) {
    cat = Math.round(cat);
    let color;
    switch (cat) {
      case 1:
        color = '#1f75fe33';
        break;
      case 2:
        color = '#1ffe3233';
        break;
      case 3:
        color = '#feb01f33';
        break;
      case 4:
        color = '#fe1f1f33';
        break;
      case 5:
        color = '#eb1ffe33';
        break;
      case 6:
        color = '#0c357733';
        break;
      default:
        break;
    }
    return color;
  }

  closeModal(): void {
    this.modalRef.close();
  }
}
