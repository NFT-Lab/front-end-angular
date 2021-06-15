import { OperasService } from './../_services/operas.service';
import { Component, OnInit } from '@angular/core';
import { Nft } from '@model/Nft';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  operas: Nft[] = [];
  fileSystemPath: string = environment.fileSystemPath;

  constructor(private operasService: OperasService) {}

  ngOnInit(): void {
    this.getOperas();
  }

  getPath(opera: Nft): string {
    return this.fileSystemPath + opera.path;
  }

  getOperas() {
    return this.operasService.getCategories().subscribe((operas) => {
      this.operas = operas;
      this.operas.forEach((opera) => {
        let n = Math.floor(Math.random() * (25 - 16 + 1) + 16);
        opera.path = 'test' + n + '.jpeg';
      });
    });
  }
}
