import { ShoppingService } from 'src/app/core/services/shopping.service';
import { map, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cart } from '../../../shared/models/cart.model';
import { IProduct } from 'src/app/shared/models/product.model';
import { calculateTotalPrice, countItems, findOcc } from 'src/app/core/helpers';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  carts: Cart[] = [];
  totalPrice: number;
  totalQuantity: number;
  userID = JSON.parse(localStorage.getItem('userData')).id;
  subscription1$: Subscription;
  subscription2$: Subscription;
  subscription3$: Subscription;
  subscriptions: Subscription[] = [];

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.subscription1$ = this.shoppingService
      .getProductsInCart()
      .pipe(
        map((res) => {
          const arr: Cart[] = [];
          let tempProduct: Cart;
          for (let key in res) {
            if (res.hasOwnProperty(key)) {
              tempProduct = res[key];
              tempProduct.key = key;
              arr.push(tempProduct);
            }
          }
          return arr;
        })
      )
      .subscribe((arr: Cart[]) => {
        let tempCarts: Cart[] = [];
        let ourKey: string = 'productId';
        arr.filter((cart) => {
          if (cart.userId === this.userID) {
            tempCarts.push(cart);
          }
        });
        this.shoppingService.shoppingCartChanged.next(tempCarts.slice()); // burası sepetteki ürün sayıısnı almak için
        this.carts = findOcc(tempCarts, ourKey);
        this.totalQuantity = countItems(this.carts);
        this.totalPrice = calculateTotalPrice(this.carts);
      });

      this.subscriptions.push(this.subscription1$);
  }

  onAddToCart(product: IProduct) {
    let quantity: number = 1;
    let cart = new Cart(
      product.id,
      product,
      quantity,
      undefined,
      undefined,
      undefined
    );
    this.subscription2$ = this.shoppingService
      .addProductInCart(cart)
      .subscribe(() => this.getProducts());

      this.subscriptions.push(this.subscription2$);
  }

  deleteItemFromCart(key: string) {
    this.subscription3$ = this.shoppingService
      .deleteProductsFromCart(key)
      .subscribe(() => this.getProducts());

       this.subscriptions.push(this.subscription3$);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
