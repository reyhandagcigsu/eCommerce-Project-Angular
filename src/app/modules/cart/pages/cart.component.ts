import { ShoppingService } from 'src/app/core/services/shopping.service';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProduct } from '../../../shared/models/product.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  products: IProduct[];
  subscriptions: Observable<IProduct[]>[] = [];
  private subscription1$: Observable<IProduct[]>;
  currentShopItemCount: number = 0;
  totalPrice: number = 0;
  key: string;
  singleItemLength: number;
  userID = JSON.parse(localStorage.getItem('userData')).id;

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {
    this.subscription1$ = this.shoppingService.getProductsInCart();
    this.subscriptions.push(this.subscription1$);
    this.getProducts();
  }

  getProducts() {
    this.subscription1$.subscribe((products: IProduct[]) => {
      this.products = products.filter((product) => {
        return product.userId === this.userID;
      });
      this.products.forEach((product) => {
        this.totalPrice += product.price;
      });
    });
  }

  deleteItemFromCart(key: string, id: number) {
    this.shoppingService
      .deleteProductsFromCart(key)
      .subscribe(() => this.getProducts());
  }

  ngOnDestroy(): void {
    // this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
