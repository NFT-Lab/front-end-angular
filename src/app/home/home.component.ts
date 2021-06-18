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
    let next: boolean = false;
    let ok: boolean = true;
    let k = 0;

    if (filters.length && this.allOperas.length) {
      this.allOperas.forEach((opera) => {
        k = 0;
        ok = true;
        filters.forEach((filter: any) => {
          if (filter === 'cat' && opera.categories.length) {
            opera.categories.forEach((cat) => {
              next = false;
              for (let i = 0; i < filtersValues.cat.length && !next; i++) {
                if (cat.name === filtersValues.cat[i].name) {
                  next = true;
                  k++;
                  ok = true;
                } else ok = false;
              }
            });
          }
          if (ok && filter === 'type') {
            if (filtersValues.type.includes(opera.type)) k++;
          }
        });
        if (k === filters.length) filteredOperas.push(opera);
      });
    }
    this.operasToShow = [...filteredOperas];
  }

  getPath(opera: Nft): string {
    return this.fileSystemPath + opera.path;
  }

  getOperas() {
    return this.operasService.getCategories().subscribe((operas) => {
      this.allOperas = this.operasToShow = operas;
      //le prossime righe saranno da togliere e servono per testare con stoplight
      //che il filtro di ricerca funzioni
      /*
      this.allOperas[0].categories.push({ id: 1, name: 'test' });
      this.allOperas[2].categories.push({ id: 1, name: 'test' });
      */
      //fine

      //le prossime righe saranno da togliere e servono per assegnare un nome a caso
      //tra le foto che vengono esposte tramite xampp
      this.allOperas.forEach((opera) => {
        let n = Math.floor(Math.random() * (25 - 16 + 1) + 16);
        opera.path = 'test' + n + '.jpeg';
      });
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
