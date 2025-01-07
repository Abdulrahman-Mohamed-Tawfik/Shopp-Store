import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: false,

  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  constructor(private _productS: ProductsService, private route: ActivatedRoute) { }
  staticURL = "";
  product: any = {}; 
  productId: any;
  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');

    this.staticURL = this._productS.staticfilesURL;

    if (this.productId) {
      this._productS.getProductById(this.productId).subscribe(product => {
        this.product = product; 
      });
    }
  }

}
