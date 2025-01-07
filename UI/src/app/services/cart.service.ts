import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }
  cartURL = "http://localhost:7000/cart";
  cartUserURL = "http://localhost:7000/cart/user";
  addToCartURL = "http://localhost:7000/cart/add";
  deleteFromCartURL = "http://localhost:7000/cart/delete";
  staticfilesURL = 'http://localhost:7000/images/'

  getCarts(): Observable<any> {
    return this.http.get<any>(this.cartURL);
  }

  getCartById(id: object): Observable<any> {
    return this.http.get<any>(`${this.cartURL}/${id}`);
  }

  getCartByUserId(userId: string): Observable<any> {
    return this.http.get<any>(`${this.cartUserURL}/${userId}`);
  }

  addProductToCart(userId: string, productId: string, quantity: number = 1): Observable<any> {
    const body = { userId, productId, quantity }; // Prepare request body

    return this.http.post<any>(this.addToCartURL, body); // Send POST request to add product to cart
  }

  deleteProductFromCart(userId: string, productId: string): Observable<any> {
    const body = { userId, productId };  // Prepare the request body with userId and productId
    return this.http.post<any>(`${this.deleteFromCartURL}`, body);  // Send POST request with the body
  }
  

}
