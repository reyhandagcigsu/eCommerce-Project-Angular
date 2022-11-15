import { Subscription } from 'rxjs/';
import { DataStorageService } from './../../shared/data-storage.service';
import {  Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingServiceService } from 'src/app/service/shopping-service.service';
import { Product } from './../products/product.model';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  navbarNavigation: string[] = ['all', 'electronics', 'fashion', 'jewelery'];

  currentShopItemCount:number= 0;
  private subscription: Subscription;
  private subscription2: Subscription;
  searchTerm: string = '';
 
  constructor(
    private router: Router,
    private dataStorageService: DataStorageService,
    private shoppingService: ShoppingServiceService,
    private productsService: ProductsService
  
  ) {}

  ngOnInit(): void {
     this.subscription = this.shoppingService.shoppingCartChanged.subscribe(
      (products: Product[]) => {
        this.currentShopItemCount = products.length;
        console.log(products);
      }
    ); 

    this.subscription2 = this.shoppingService.shoppingCartItemAdded.subscribe(
      (number_: number) => {
        this.currentShopItemCount=number_;
      }
    ); 

    
    //this.products = this.shoppingService.getProducts();
  }

  onFetchDataPerCategory(category: string) {
    if (category === 'all' || category === 'home') {
      this.router.navigate(['/products']);
    } else if (category !== 'fashion') {
      this.dataStorageService.fetchCategory(category);
    } else {
      this.dataStorageService.fetchMenAndWomen();
    }
  }

  openCart() {
    this.router.navigate(['/cart']);
  }

  search(event: any ) {
  this.searchTerm = (event.target as HTMLInputElement).value;
  this.productsService.search.next(this.searchTerm);
  
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }
}
