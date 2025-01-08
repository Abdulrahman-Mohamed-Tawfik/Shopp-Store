import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient, private _authS: AuthService) { }
  cartURL = "http://localhost:7000/cart";
  cartUserURL = "http://localhost:7000/cart/user";
  addToCartURL = "http://localhost:7000/cart/add";
  deleteFromCartURL = "http://localhost:7000/cart/delete";
  staticfilesURL = 'http://localhost:7000/images/'

  getCarts(): Observable<any> {
    const headers = this._authS.getHeaders();
    return this.http.get<any>(this.cartURL, { headers });// SEND HEADERS WITH GET REQUEST 
  }

  getCartById(id: object): Observable<any> {
    const headers = this._authS.getHeaders();
    return this.http.get<any>(`${this.cartURL}/${id}`, { headers });// SEND HEADERS WITH GET REQUEST 
  }

  getCartByUserId(userId: string): Observable<any> {
    return this.http.get<any>(`${this.cartUserURL}/${userId}`);
  }

  addProductToCart(userId: string, productId: string, quantity: number = 1): Observable<any> {
    const body = { userId, productId, quantity };

    return this.http.post<any>(this.addToCartURL, body);
  }

  deleteProductFromCart(userId: string, productId: string): Observable<any> {
    const body = { userId, productId };
    return this.http.post<any>(`${this.deleteFromCartURL}`, body);
  }


}
