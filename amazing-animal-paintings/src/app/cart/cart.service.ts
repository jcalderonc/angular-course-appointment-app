import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart_url = environment.api_url+"/cart";
  private checkout_url = environment.api_url+"/checkout";
  
  constructor(private http:HttpClient) {}

  addToCart(product: Product): Observable<Product>{
    return this.http.post<Product>(this.cart_url, product);
  } 

  getCartItems() : Observable<Product[]> {
    return this.http.get<Product[]>(this.cart_url);
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(this.cart_url);
  }

  checkout(items : Product[]): Observable<void> {
    return this.http.post<void>(this.checkout_url, items);
  }
}
