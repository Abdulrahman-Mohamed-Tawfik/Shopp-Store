import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: any;
  userId: string | null = null;
  staticURL: string = '';

  constructor(private _cartS: CartService, private route: ActivatedRoute) { this.staticURL = _cartS.staticfilesURL; }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId');
    if (this.userId) {
      this._cartS.getCartByUserId(this.userId).subscribe(
        (cart) => {
          this.cart = cart;
        },
        (error) => {
          console.error('Error fetching cart:', error);
        }
      );
    }
  }

  // Update item quantity
  updateQuantity(item: any, change: number) {
    item.quantity = Math.max(1, item.quantity + change); // Prevent negative values
    this.onQuantityChange(item);
  }

  // Handle quantity change
  onQuantityChange(item: any) {
    // Update the cart quantity on the backend (if required)
    console.log('Quantity updated:', item);
  }

  // Remove item from the cart
  removeItem(item: any, productId: string) {
    const index = this.cart.items.indexOf(item);
    if (index !== -1) {
      this.cart.items.splice(index, 1);
      // Update the cart on the backend
      if (this.userId && productId) {
        this._cartS.deleteProductFromCart(this.userId, productId)
          .subscribe(
            response => {
              console.log('Product deleted from cart:', response);
            },
            error => {
              console.error('Error deleting product from cart:', error);
            }
          );
      }
      console.log('Item removed:', item);
    }
  }

  calculateTotal(): number {
    return this.cart.items.reduce((total: number, item: any) => {
      return total + item.product.price * item.quantity;
    }, 0);
  }

  checkout() {
    console.log('Checkout initiated');
    // checkout logic here
  }


}
