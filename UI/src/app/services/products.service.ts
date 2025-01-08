import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient, private _authS: AuthService) { }
  productURL = "http://localhost:7000/product";
  staticfilesURL = 'http://localhost:7000/images/'

  getProducts(): Observable<any> {
    return this.http.get<any>(this.productURL);
  }
  getProductById(id: object): Observable<any> {
    return this.http.get<any>(`${this.productURL}/${id}`);
  }

  getProductsByCategory(categoryId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.productURL}/category/${categoryId}`);
  }

  getFeaturedProductImages(): Observable<string[]> {
    return this.http.get<any[]>(this.productURL).pipe(
      map((products) =>
        products
          .filter((product) => product.isFeatured) 
          .map((product) => product.imageURL) 
          .flat() 
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
    const headers = this._authS.getHeaders();

    return this.http.post<any>(this.productURL, formData, { headers });// SEND HEADERS WITH POST REQUEST 
  }

  deleteProduct(productId: any): Observable<any> {
    return this.http.delete<any>(`${this.productURL}/${productId}`);

  }

}
