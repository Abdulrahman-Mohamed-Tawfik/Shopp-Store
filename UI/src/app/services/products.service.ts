import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }
  productURL = "http://localhost:7000/product";
  staticfilesURL = 'http://localhost:7000/images/'

  getProducts(): Observable<any> {
    return this.http.get<any>(this.productURL);
  }
  getProductById(id: object): Observable<any> {
    return this.http.get<any>(`${this.productURL}/${id}`); // Assuming your API endpoint is '/product/:id'
  }

  getProductsByCategory(categoryId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.productURL}/category/${categoryId}`);
  }

  getFeaturedProductImages(): Observable<string[]> {
    return this.http.get<any[]>(this.productURL).pipe(
      map((products) =>
        products
          .filter((product) => product.isFeatured) // Filter featured products
          .map((product) => product.imageURL) // Extract images
          .flat() // Flatten in case of multiple images per product
      )
    );
  }

  createProduct(productData: any, file: File | null): Observable<any> {
    const formData = new FormData();

    // Append product data to FormData
    for (const key in productData) {
      if (productData.hasOwnProperty(key)) {
        formData.append(key, productData[key]);
      }
    }

    if (file) {
      formData.append('productImage', file);
    }

    return this.http.post<any>(this.productURL, formData);
  }

  deleteProduct(productId: any): Observable<any> {
    return this.http.delete<any>(`${this.productURL}/${productId}`);

  }

}
