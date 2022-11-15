import { Product } from './../components/products/product.model';
import { ShoppingServiceService } from 'src/app/service/shopping-service.service';
import { ProductsService } from '../service/products.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { combineLatest, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  url: string =
    'https://ecommerce-angular-2f5fa-default-rtdb.firebaseio.com/products';

  constructor(
    private http: HttpClient,
    private productsService: ProductsService,
    private shoppingService: ShoppingServiceService
  ) {}

  fetchProducts() {
    return this.http.get<Product[]>('https://fakestoreapi.com/products').pipe(
      tap((products) => {
        this.productsService.setProducts(products);
      })
    );
  }

  fetchCategory(category: string) {
    this.http
      .get<Product[]>('https://fakestoreapi.com/products/category/' + category)
      .pipe(
        tap((products) => {
          this.productsService.setProductsPerCategory(products);
        })
      )
      .subscribe();
  }

  fetchMenAndWomen() {
    const men = this.http.get<Product[]>(
      'https://fakestoreapi.com/products/category/men%27s%20clothing'
    );

    const women = this.http.get<Product[]>(
      'https://fakestoreapi.com/products/category/women%27s%20clothing'
    );

    const fashion = combineLatest(men, women)
      .pipe(
        tap((products) => {
          const products_: Product[] = [...products[0], ...products[1]];
          this.productsService.setProductsPerCategory(products_);
        })
      )
      .subscribe();
  }

  StoreAddedProductsInCart(product: Product) {
    this.http
      .post<Product>(
        'https://ecommerce-angular-2f5fa-default-rtdb.firebaseio.com/products.json',
        product
      )
      .subscribe((responseData) => {
        // console.log(responseData);
      });
  }

  fetchProductsInCart() {
    this.http
      .get<Product[]>(
        'https://ecommerce-angular-2f5fa-default-rtdb.firebaseio.com/products.json'
      )
      .pipe(
        map((responseData) => {
          const arr: Product[] = [];
          for (let key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              let tempProduct: Product;
              tempProduct = responseData[key];
              tempProduct.key = key;
              arr.push(tempProduct);
            }
          }
          this.shoppingService.setProductsInCart(arr);
        })
      )
      .subscribe();
  }

  deleteProductsFromCart(key: string) {
    this.http
      .delete<void>(
        `https://ecommerce-angular-2f5fa-default-rtdb.firebaseio.com/products/${key}.json`
      )
      .subscribe();
  }
}
