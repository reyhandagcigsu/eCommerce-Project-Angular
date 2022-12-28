import { Subscription } from 'rxjs/';
import { ProductsService } from 'src/app/core/services/products.service';
import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product.model';
import { ShoppingService } from 'src/app/core/services/shopping.service';
import { Cart } from 'src/app/shared/models/cart.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = [];
  currentShopItemCount: number;
  params: { category: string };
  searchKey: string = '';
  isLoading = false;
  userID = JSON.parse(localStorage.getItem('userData')).id;

  subscriptions: Subscription[] = [];
  subscription1$: Subscription;
  subscription2$: Subscription;
  subscription3$: Subscription;
  subscription4$: Subscription;

  constructor(
    private productsService: ProductsService,
    private shoppingService: ShoppingService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.subscription1$ = this.productsService
      .getProducts()
      .subscribe((products: IProduct[]) => {
        this.isLoading = false;
        this.products = products;
        this.productsService.productsChanged.next(this.products);
      });
    this.subscriptions.push(this.subscription1$);

    this.subscription2$ = this.productsService.productsChanged.subscribe(
      (data: IProduct[]) => {
        this.products = data;
      }
    );
    this.subscriptions.push(this.subscription2$);

    this.subscription3$ = this.shoppingService.shoppingCartChanged.subscribe(
      (carts: Cart[]) => {
        this.currentShopItemCount = carts.length;
        this.shoppingService.setShoppingCartItemCount(
          this.currentShopItemCount
        );
      }
    );
    this.subscriptions.push(this.subscription3$);

    this.subscription4$ = this.productsService.search.subscribe(
      (value: any) => {
        this.searchKey = value;
      }
    );

    this.subscriptions.push(this.subscription4$);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
