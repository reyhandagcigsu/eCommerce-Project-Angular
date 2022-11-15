import { ShoppingServiceService } from 'src/app/service/shopping-service.service';
import { DataStorageService } from './../../shared/data-storage.service';
import { Subscription } from 'rxjs/';
import { Product } from './../products/product.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {  Params, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  products: Product[];
  private subscription: Subscription;
  private subscription2: Subscription;
  key: string;
  product : Product;

  constructor(
    private dataStorageService: DataStorageService,
    private shoppingService: ShoppingServiceService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.dataStorageService.fetchProductsInCart();
    this.subscription = this.shoppingService.shoppingCartChanged.subscribe(
      (products: Product[]) => {
        this.products = products;
      }
    );
    this.products = this.shoppingService.getProducts();


  }

  deleteItemFromCart(key: string, id: number) {
    this.dataStorageService.deleteProductsFromCart(key);
    this.shoppingService.deleteCartItem(id);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
