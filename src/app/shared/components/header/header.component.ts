import { AuthService } from 'src/app/core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from '../../models/product.model';
import { ProductsService } from 'src/app/core/services/products.service';
import { tap } from 'rxjs/operators';
import { ShoppingService } from 'src/app/core/services/shopping.service';
import { Cart } from 'src/app/shared/models/cart.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  navbarNavigation: string[] = ['all', 'electronics', 'fashion', 'jewelery'];
  isAuthenticated = false;
  searchTerm: string = '';
  products: IProduct[];
  displaySearchInput = true;
  url: string;

  subscription1$: Subscription;
  subscription2$: Subscription;
  subscription3$: Subscription;
  subscription4$: Subscription;
  subscriptions: Subscription[] = [];

  currentShopItemCount: number;

  constructor(
    private router: Router,
    private productsService: ProductsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private shoppingService: ShoppingService
  ) {}

  ngOnInit(): void {
    this.url = this.route.snapshot.url.join('');
    if (this.url === 'cart') {
      this.displaySearchInput = false;
    }

    this.subscription1$ = this.shoppingService.shoppingCartChanged.subscribe(
      (carts: Cart[]) => {
        this.currentShopItemCount = carts.length;
        console.log(carts);
      }
    );

    this.subscriptions.push(this.subscription1$);

    this.subscription2$ = this.shoppingService.shoppingCartItemAdded.subscribe(
      (number_: number) => {
        this.currentShopItemCount = number_;
      }
    );

    this.subscriptions.push(this.subscription2$);
  }

  onGetProductsPerCategory(category: string) {
    if (category === 'all' || category === 'home') {
      this.clearText();
      this.router.navigate(['/products']);
    } else if (category !== 'fashion') {
      this.subscription3$ = this.productsService
        .getCategoryProducts(category)
        .subscribe((products: IProduct[]) => {
          this.products = products;
          this.productsService.productsChanged.next(this.products);
        });
      this.subscriptions.push(this.subscription3$);
      this.clearText();
    } else {
      this.subscription4$ = this.productsService
        .getMenAndWomenCategoryProducts()
        .pipe(
          tap((products) => {
            const products_: IProduct[] = [...products[0], ...products[1]];
            this.products = products_;
            this.productsService.productsChanged.next(products_);
          })
        )
        .subscribe();
      this.subscriptions.push(this.subscription4$);
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

  clearText() {
    this.searchTerm = '';
    this.productsService.search.next(this.searchTerm);
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
