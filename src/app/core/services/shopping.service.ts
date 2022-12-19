import { IProduct } from 'src/app/shared/models/product.model';
import { Injectable } from '@angular/core';
import { map, take, exhaustMap, filter, Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from '../../../environments/environment';
import { Cart } from 'src/app/shared/models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  urlFirebaseRealtimeDbApiDomain: string =
    environment.FirebaseRealtimeDbApiDomain;
    cartItemCount = new Subject<Number>;
    cartItems : Cart[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  addProductInCart(cart: Cart) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        cart = {
          ...cart,
          userId: user.id,
        };
        return this.http.post<IProduct>(
          `${this.urlFirebaseRealtimeDbApiDomain}/carts.json`,
          cart,
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
        return this.http.get<Cart>(
          `${this.urlFirebaseRealtimeDbApiDomain}/carts.json`,
          {
            params: new HttpParams().set('auth', user.token),
          }
        );
      })
    );
  }

  deleteProductsFromCart(key: string) {
    return this.http.delete<void>(
      `${this.urlFirebaseRealtimeDbApiDomain}/carts/${key}.json`
    );
  }
}
