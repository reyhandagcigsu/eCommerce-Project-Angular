import { DataStorageService } from './../../shared/data-storage.service';
import { Subscription } from 'rxjs/';
import { ProductsService } from './../../service/products.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingServiceService } from 'src/app/service/shopping-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  currentShopItemCount: number =0;
  subscription: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;
  params: { category: string };
  searchKey: string = '';
 

  constructor(
    private productsService: ProductsService,
    private dataStorageService: DataStorageService,
    private route: ActivatedRoute,
    private shoppingService: ShoppingServiceService
  ) {}

  ngOnInit(): void {
    this.dataStorageService.fetchProducts().subscribe();
    this.subscription = this.productsService.productsChanged.subscribe(
      (products: Product[]) => {
        this.products = products;
      }
    );
    this.products = this.productsService.getProducts(); 
   
     this.dataStorageService.fetchProductsInCart();  // üstteki sepet sayısı için tekrar fetch ettim. 
    this.subscription2 = this.shoppingService.shoppingCartChanged.subscribe(
      (products: Product[]) => {
        this.currentShopItemCount = products.length;
        this.shoppingService.setShoppingCartItemCount(this.currentShopItemCount);
      }
    );

    this.subscription3 = this.productsService.search.subscribe(
      (value: any) => {
        this.searchKey = value;
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }
}
