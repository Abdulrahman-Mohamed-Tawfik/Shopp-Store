import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-featured-products',
  standalone: false,

  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.css'
})
export class FeaturedProductsComponent implements OnInit {
  products: any[] = [];  
  staticURL: string = ''; 
  
  constructor(private _productS: ProductsService) { }

  ngOnInit(): void {
    this.staticURL = this._productS.staticfilesURL;

    this._productS.getProducts().subscribe(products => {
      this.products = products.filter((p: any) => p.isFeatured == true);
    });
  }

}
