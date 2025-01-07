import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-categories',
  standalone: false,

  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  constructor(private _categoryS: CategoriesService) { }
  categories!: any[];// ! means array will be assigned but not now
  staticURL = ''
  ngOnInit() {
    this.staticURL = this._categoryS.staticfilesURL;
    this._categoryS.getCategories().subscribe(categories => {
      console.log(categories);
      this.categories = categories;
    });
  }
}
