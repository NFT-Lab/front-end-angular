import { OperasService } from './../_services/operas.service';
import { Component, OnInit } from '@angular/core';
import { Nft } from '@model/Nft';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { OperaDetailsComponent } from '../profilePage/opera-details/opera-details.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allOperas: Nft[] = [];
  operasToShow: Nft[] = [];
  fileSystemPath: string = environment.fileSystemPath;
  searchDone: boolean = false;
  //array di ID di opere caricate in blockchain
  photos: string[] = [
    'QmUoxQnAHehMEKH1CCbr1bu69P4r79kPXRKFqn6v3Pyret',
    'QmNe7jwQqawJ9TNouzBwDLfS294SxNo7FEuuKBkkpRRFHh',
    'QmbHx7zHgibMF9ktjaRm5dDT3bRAtqa7EVBPJ8jTvpLahe',
    'QmWjHc9zb5ojPsjA43B3SFyKRPqd9Mc57R9EnTCgduyNzv',
    'Qmb13ALEkqXtVXGxCSXJvAQNVwytCFcr5DT6jcrXuUGjat',
    'QmUZKcyxFm82CpsuRxkentY3zw8dRxGxHni8ggDuxQQYDP',
  ];

  constructor(
    private operasService: OperasService,
    public modal: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getOperas();
  }

  search(s: string): void {
    if (s) {
      this.searchDone = true;
      let filteredOperas: Nft[] = [];
      this.allOperas.forEach((opera) => {
        if (opera.title.includes(s)) filteredOperas.push({ ...opera });
      });
      this.operasToShow = [...filteredOperas];
    }
  }

  resetSearch(): void {
    this.searchDone = false;
    this.operasToShow = [...this.allOperas];
  }

  filteredSearch(fs: Object): void {
    this.operasToShow = [...this.allOperas];
    this.searchDone = true;
    let filteredOperas: Nft[] = [];
    let filters = Object.keys(fs);
    let filtersValues: any = fs;
    let ok: boolean = true;
    let k = 0;

    if (filters.length && this.allOperas.length) {
      //scorro tutte le opere
      this.allOperas.forEach((opera) => {
        k = 0;
        ok = true;
        //scorro tutti i filtri
        filters.forEach((filter: any) => {
          if (filter === 'cat' && opera.categories.length) {
            opera.categories.forEach((cat) => {
              for (let i = 0; i < filtersValues.cat.length; i++) {
                //se matcho una categoria aumento il contatore
                if (cat.name === filtersValues.cat[i].name) k++;
              }
            });
            //se il numero di match != categorie che cerco mi fermo
            if (k !== filtersValues.cat.length) ok = false;
          }
          if (ok && filter === 'type') {
            if (!filtersValues.type.includes(opera.type)) ok = false;
          }
        });
        if (ok) filteredOperas.push(opera);
      });
    }
    this.operasToShow = [...filteredOperas];
  }

  getPath(opera: Nft): string {
    return opera.path;
  }

  getOperas() {
    return this.operasService.getCategories().subscribe((operas) => {
      this.allOperas = this.operasToShow = operas;

      this.allOperas.forEach((opera) => {
        let n = Math.floor(Math.random() * 6);
        //opera.path = 'https://cloudflare-ipfs.com/ipfs/' + this.photos[n];
        //INTEGRAZIONE
        opera.path = 'https://cloudflare-ipfs.com/ipfs/' + opera.id;
      });
      this.operasToShow = [...this.allOperas];
    });
  }

  openDetailsOperaModal(opera: Nft) {
    this.modal.open(OperaDetailsComponent, {
      panelClass: 'dialog-responsive',
      data: opera,
    });
  }

  openSnackBar() {
    this.snackBar.open('Aggiunto ai preferiti! ❤️', 'Chiudi', {
      duration: 3000,
    });
  }
}
