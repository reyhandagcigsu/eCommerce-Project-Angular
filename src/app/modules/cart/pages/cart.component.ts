import { ShoppingService } from 'src/app/core/services/shopping.service';
import { Subscription } from 'rxjs/';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProduct } from '../../../shared/models/product.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ICart } from '../../../shared/models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  products: IProduct[];
  subscriptions: Subscription[] = [];
  private subscription1$: Subscription;
  private subscription2$: Subscription;
  private subscription3$: Subscription;
  totalPrice: number =0;
  key: string;
  singleItemLength: number;
  userID = JSON.parse(localStorage.getItem('userData')).id;

  constructor(
    private shoppingService: ShoppingService,
  ) {}

  subscription = this.shoppingService
    .getProductsInCart()
    .subscribe((products: IProduct[]) => {
      this.products = products.filter(product => {
        return product.userId === this.userID;
      })
      this.products.forEach((product) => {
        this.totalPrice += product.price;
      })
    });

  ngOnInit(): void {
    this.subscription1$ = this.subscription;
    this.subscriptions.push(this.subscription1$);
  }

  
  deleteItemFromCart(key: string, id: number) {
    this.shoppingService.deleteProductsFromCart(key);
     this.subscription2$ = this.subscription;
    this.subscriptions.push(this.subscription2$); 
  }

 
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
