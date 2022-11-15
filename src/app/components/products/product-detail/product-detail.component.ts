import { ShoppingServiceService } from 'src/app/service/shopping-service.service';
import { ProductsService } from './../../../service/products.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  id: number;

  constructor(
    private producstsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private dataStorageService: DataStorageService,
    private shoppingService: ShoppingServiceService
  ) {}

  ngOnInit(): void {
   /*  this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.product = this.producstsService.getProduct(this.id);
    }); */
    
    this.route.data.subscribe(
      (data: Data) => {
        this.product = data['product'];
      }
    )
  }

  onAddToCart() {
    this.shoppingService.addNewCartItem();
   this.dataStorageService.StoreAddedProductsInCart(this.product);
  }

}
