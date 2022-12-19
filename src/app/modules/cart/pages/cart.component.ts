import { ShoppingService } from 'src/app/core/services/shopping.service';
import { map } from 'rxjs';
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

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.shoppingService
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
        this.carts = findOcc(tempCarts, ourKey);
        this.totalQuantity = countItems(this.carts);
        this.totalPrice = calculateTotalPrice(this.carts);
      });
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
    ); // key burda elimde yok ama class constructor da optional yaptım sorun olur mu?
    this.shoppingService
      .addProductInCart(cart)
      .subscribe(() => this.getProducts());
  }

  deleteItemFromCart(key: string) {
    this.shoppingService
      .deleteProductsFromCart(key)
      .subscribe(() => this.getProducts());
  }

  deleteCart(key: string, cart: Cart) {
    // keyleri nasıl alcam?
  }

  ngOnDestroy(): void {}
}
