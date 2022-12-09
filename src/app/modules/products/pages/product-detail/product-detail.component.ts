import { ShoppingService } from 'src/app/core/services/shopping.service';
import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products.service';
import { Cart } from '../../../../shared/models/cart.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product: IProduct;
  id: number;
  isLoading = false;

  constructor(
    private producstsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private shoppingService: ShoppingService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
    });

    this.isLoading= true;
    this.producstsService.getProduct(this.id).subscribe((product: IProduct) => {
      this.isLoading = false;
      this.product = product;
    });
  }

  onAddToCart(product: IProduct) {
    let quantity:number = 1;
    let cart = new Cart();
    cart.product = product;
    cart.productId = product.id;
    cart.quantity = quantity;
    this.shoppingService.addProductInCart(cart).subscribe();
  }
}
