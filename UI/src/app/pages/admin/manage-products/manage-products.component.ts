import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { ConfirmationModalComponent } from '../../../components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-manage-products',
  standalone: false,
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {
  products: any;
  productIdToDelete: any = null;
  ImageBaseURL: string = "";
  @ViewChild(ConfirmationModalComponent) confirmationModal!: ConfirmationModalComponent;

  constructor(private _productS: ProductsService) { }

  ngOnInit(): void {
    this.fetchProducts();
    this.ImageBaseURL = this._productS.staticfilesURL;
  }

  fetchProducts(): void {
    this._productS.getProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  deleteProduct(id: any): void {
    console.log("Deleting product with id:", id);
    this.productIdToDelete = id;

    if (this.confirmationModal) {
      this.confirmationModal.showModal();
    }
  }

  deleteProductWithConfirmation(): void {
    if (this.productIdToDelete) {
      this._productS.deleteProduct(this.productIdToDelete).subscribe({
        next: (response) => {
          this.fetchProducts();
        },
        error: (err) => {
          console.error('Error deleting product:', err);
          alert('Error deleting product');
        }
      });
    }
  }

  cancelDeletion(): void {
    console.log('Deletion cancelled');
  }

  edit(product: any): void {
    console.log('Editing product:', product);
  }
}
