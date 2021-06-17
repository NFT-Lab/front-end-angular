import { Type } from '@model/Utils';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Category } from '@model/Category';
import { CategoriesService } from '@service/categories.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-search',
  templateUrl: './filter-search.component.html',
  styleUrls: ['./filter-search.component.css'],
})
export class FilterSearchComponent implements OnInit {
  allCategories: Category[] = [];
  formGroup: FormGroup;
  payload: boolean = true;
  types: string[] = ['Immagine', 'Video', 'Audio', 'Documento'];

  constructor(
    private catService: CategoriesService,
    public modalRef: MatDialogRef<FilterSearchComponent>
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      categories: new FormControl(this.allCategories, []),
      types: new FormControl(this.types, []),
      likes: new FormControl(false, []),
    });
  }

  getCategories() {
    return this.catService.getCategories().subscribe((cats) => {
      this.allCategories = cats;
      //le prossime righe saranno da togliere e servono per testare con stoplight
      //che il filtro di ricerca funzioni
      //this.allCategories.push({ id: 3, name: 'food' });
      //fine
    });
  }
  closeModal(): void {
    this.payload = false;
    this.modalRef.close();
  }

  sendFilters() {
    if (this.payload) {
      let field = this.formGroup.controls;
      let filters: any = {};
      if (field.categories.value.length) filters.cat = field.categories.value;
      if (field.types.value.length) {
        for (let i = 0; i < field.types.value.length; i++) {
          field.types.value[i] = Type[field.types.value[i]];
        }

        filters.type = field.types.value;
      }

      this.modalRef.close(filters);
    }
  }
}
