import { ShoppingService } from 'src/app/core/services/shopping.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products.service';
import { Cart } from '../../../../shared/models/cart.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product: IProduct;
  id: number;
  isLoading = false;

  subscription1$: Subscription;
  subscription2$: Subscription;
  subscription3$: Subscription;
  subscriptions: Subscription[] = [];

  constructor(
    private producstsService: ProductsService,
    private route: ActivatedRoute,
    private shoppingService: ShoppingService
  ) {}

  ngOnInit(): void {
   this.subscription1$ = this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
    });

    this.subscriptions.push(this.subscription1$);

    this.isLoading = true;
   this.subscription2$ = this.producstsService.getProduct(this.id).subscribe((product: IProduct) => {
      this.isLoading = false;
      this.product = product;
    });

    this.subscriptions.push(this.subscription2$);
  }

  onAddToCart(product: IProduct) {
    let quantity: number = 1;
    let cart = new Cart(
      product.id,
      product,
      quantity,
      undefined,
      undefined,
      undefined
    );
    this.shoppingService.addNewCartItem();
   this.subscription3$ = this.shoppingService.addProductInCart(cart).subscribe();
   this.subscriptions.push(this.subscription3$);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
