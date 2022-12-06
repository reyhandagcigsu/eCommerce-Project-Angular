import { ShoppingService } from './../../../core/services/shopping.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs/';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProduct } from '../../models/product.model';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  navbarNavigation: string[] = ['all', 'electronics', 'fashion', 'jewelery'];
  isAuthenticated = false;

  currentShopItemCount: number = 0;
  
  private subscription$1: Subscription;
  searchTerm: string = '';
  products: IProduct[];

  constructor(
    private router: Router,
    private shoppingService: ShoppingService,
    private productsService: ProductsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subscription$1 = this.shoppingService.shoppingCartItemAdded.subscribe(
      (number_: number) => {
        this.currentShopItemCount = number_;
      }
    );
  }

  onGetProductsPerCategory(category: string) { 
    if (category === 'all' || category === 'home') {
      this.router.navigate(['/products']);
    } else if (category !== 'fashion') {
      this.productsService.getCategoryProducts(category);
    } else {
      this.productsService.getMenAndWomenCategoryProducts();
    }
  }

  openCart() {
    this.router.navigate(['/cart']);
  }
  
  search(event: any ) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.productsService.search.next(this.searchTerm);
    
    }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
   this.subscription$1.unsubscribe();
  }
}
