import { ShoppingService } from './../../../core/services/shopping.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProduct } from '../../models/product.model';
import { ProductsService } from 'src/app/core/services/products.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  navbarNavigation: string[] = ['all', 'electronics', 'fashion', 'jewelery'];
  isAuthenticated = false;
  //currentShopItemCount: number = 0;
  //private subscription$1: Subscription;
  searchTerm: string = '';
  products: IProduct[];

  constructor(
    private router: Router,
    private shoppingService: ShoppingService,
    private productsService: ProductsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
  }

  onGetProductsPerCategory(category: string) {
    if (category === 'all' || category === 'home') {
      this.clearText();
      this.router.navigate(['/products']);
    } else if (category !== 'fashion') {
      this.productsService
        .getCategoryProducts(category)
        .subscribe((products: IProduct[]) => {
          this.products = products;
          this.productsService.productsChanged.next(this.products);
        });
        this.clearText();
    } else {
      this.productsService
        .getMenAndWomenCategoryProducts()
        .pipe(
          tap((products) => {
            const products_: IProduct[] = [...products[0], ...products[1]];
            this.products = products_;
            this.productsService.productsChanged.next(products_);
          })
        )
        .subscribe();
        this.clearText();
    }
  }

  openCart() {
    this.router.navigate(['/cart']);
  }

  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.productsService.search.next(this.searchTerm);
  }

  clearText(){
    this.searchTerm = '';
    this.productsService.search.next(this.searchTerm);
}

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    //this.subscription$1.unsubscribe();
  }
}
