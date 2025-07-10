import { Component, OnInit} from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../../models/product';


@Component({
  selector: 'app-cart-view',
  standalone: false,
  templateUrl: './cart-view.component.html',
  styleUrl: './cart-view.component.css'
})
export class CartViewComponent implements OnInit {
  cartItems: Product[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}
  
  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.getTotalPrice();
    });
  }


  clearCart() {
    this.cartService.clearCart().subscribe(() => {
      this.cartItems = [];
      this.totalPrice = 0;

    });
  }

  checkout() {
    this.cartService.checkout(this.cartItems).subscribe(() => {
      this.cartItems = [];
      this.totalPrice = 0;
      alert('Checkout successful!');
    }, error => {
      console.error('Checkout failed', error);
      alert('Checkout failed. Please try again later.');
    });
  } 



  getTotalPrice(): number {
    let total=0;
    for(let item of this.cartItems) {
      total += item.price;
    }
    return total;
  }
}
