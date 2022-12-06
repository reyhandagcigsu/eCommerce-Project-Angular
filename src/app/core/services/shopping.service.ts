import { IProduct } from 'src/app/shared/models/product.model';
import { Injectable } from '@angular/core';
import { Subject, map, take, exhaustMap, filter } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  urlFirebaseRealtimeDbApiDomain: string = environment.FirebaseRealtimeDbApiDomain;
  shoppingProducts: IProduct[] = [];
   shoppingCartChanged = new Subject<IProduct[]>();
  shoppingCartItemAdded = new Subject<number>();
  currentShopItemCount = 0;

  constructor(private http: HttpClient, private authService: AuthService) {}

  addProductInCart(product: IProduct) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        product = {
          ...product,
          userId: user.id,
        };
        return this.http.post<IProduct>(
          `${this.urlFirebaseRealtimeDbApiDomain}/products.json`,
          product,
          {
            params: new HttpParams().set('auth', user.token),
          }
        );
      })
    );
  }

  getProductsInCart() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get<IProduct[]>(
          `${this.urlFirebaseRealtimeDbApiDomain}/products.json`,
          {
            params: new HttpParams().set('auth', user.token),
          }
        );
      }),
      map((products) => {
        const arr: IProduct[] = [];
        let tempProduct: IProduct;
        for (let key in products) {
          if (products.hasOwnProperty(key)) {
            tempProduct = products[key];
            tempProduct.key = key;
            arr.push(tempProduct);
          }
        }
        return arr;
      })
    );
  }

  deleteProductsFromCart(key: string) {
    return this.http
      .delete<void>(`${this.urlFirebaseRealtimeDbApiDomain}/products/${key}.json`);
  }

  addNewCartItem() {
    this.currentShopItemCount++;
    this.shoppingCartItemAdded.next(this.currentShopItemCount);
  }

  setShoppingCartItemCount(count: number) {
    this.currentShopItemCount = count;
    this.shoppingCartItemAdded.next(this.currentShopItemCount);
  }
}
