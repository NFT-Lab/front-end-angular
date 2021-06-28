import { FilterSearchComponent } from './../filter-search/filter-search.component';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  formGroup: FormGroup;
  userName: string = JSON.parse(localStorage.getItem('User') || '{}').name;
  route: Router;
  @Output() searchEvent = new EventEmitter<string>();
  @Output() filteredSearchEvent = new EventEmitter<Object>();

  constructor(public modal: MatDialog, private router: Router) {
    this.route = router;
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      search: new FormControl('', []),
    });
  }

  checkAuth(): boolean {
    return localStorage.getItem('User') === null;
  }

  logout(): void {
    localStorage.clear();
  }

  search() {
    this.searchEvent.emit(this.formGroup.controls.search.value);
  }

  openFilterSearchModal() {
    let modalRef = this.modal.open(FilterSearchComponent, {
      panelClass: 'dialog-responsive',
    });
    modalRef.afterClosed().subscribe((filters) => {
      if (filters) this.filteredSearchEvent.emit(filters);
    });
  }
}
