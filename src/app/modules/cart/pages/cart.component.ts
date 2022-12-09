import { ShoppingService } from 'src/app/core/services/shopping.service';
import { Observable, Subscription, map } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProduct } from '../../../shared/models/product.model';
import { Cart } from '../../../shared/models/cart.model';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
 
  carts: Cart[] = [];
  //subscriptions: Observable<IProduct[]>[] = [];
  subscriptions: Observable<Cart[]>[] = [];
  //private subscription1$: Observable<IProduct[]>;
  private subscription1$: Observable<Cart[]>;
  currentShopItemCount: number = 0;
  totalPrice: number = 0;
  key: string;
  singleItemLength: number;
  userID = JSON.parse(localStorage.getItem('userData')).id;

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {
   //this.subscription1$ = this.shoppingService.getProductsInCart();
    this.subscriptions.push(this.subscription1$);
    this.getProducts();
  }

  getProducts() {
    this.shoppingService.getProductsInCart().pipe(
      map(res => {
        const arr: Cart[] = [];
        let tempProduct: Cart;
        for (let key in res) {
          if (res.hasOwnProperty(key)) {
            tempProduct = res[key];
            tempProduct.key = key;
            arr.push(tempProduct);
          }
        }
        this.carts = arr;
      })
    ).subscribe(
      () => {
          this.carts = this.carts.filter((cart) => {
          return cart.userId === this.userID;
        });
        
      }
    );
  }

/* 
  updateBasket(product: IProduct, quantity:number) {
   // product.quantity = product.quantity + quantity;
    
  }

 */
  deleteItemFromCart(key: string) {
    this.shoppingService
      .deleteProductsFromCart(key)
      .subscribe(() => this.getProducts());
  }

  ngOnDestroy(): void {
    // this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
