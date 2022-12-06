import { ShoppingService } from 'src/app/core/services/shopping.service';
import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product: IProduct;
  id: number;

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

    this.producstsService.getProduct(this.id).subscribe((product: IProduct) => {
      this.product = product;
    });
  }

  onAddToCart() {
    this.shoppingService.addNewCartItem();
    this.shoppingService.addProductInCart(this.product).subscribe();
  }
}
