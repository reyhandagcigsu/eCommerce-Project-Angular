import { Subscription } from 'rxjs/';
import { ProductsService } from 'src/app/core/services/products.service';
import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ShoppingService } from 'src/app/core/services/shopping.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = [];
  currentShopItemCount: number = 0;
  subscriptions: Subscription[] = [];
  subscription$3: Subscription;
  subscription$1: Subscription;
  subscription$2: Subscription;
  params: { category: string };
  searchKey: string = '';

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private shoppingService: ShoppingService
  ) {}

  ngOnInit(): void {
   this.productsService.getProducts();
   this.subscription$2 = this.productsService.productsChanged.subscribe(
    (data: IProduct[]) => {
      this.products = data;
    }
   )
   this.subscriptions.push(this.subscription$2);
   this.subscription$1 = this.productsService.search.subscribe(
    (value: any) => {
      this.searchKey = value;
    }
  )
  this.subscriptions.push(this.subscription$1);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}