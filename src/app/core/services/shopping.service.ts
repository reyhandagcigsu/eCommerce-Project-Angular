import { IProduct } from 'src/app/shared/models/product.model';
import { Injectable } from '@angular/core';
import { take, exhaustMap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from '../../../environments/environment';
import { Cart } from 'src/app/shared/models/cart.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  urlFirebaseRealtimeDbApiDomain: string =
    environment.FirebaseRealtimeDbApiDomain;
    shoppingCartItemAdded = new Subject<number>(); 
    shoppingCartChanged = new Subject<Cart[]>();
    currentShopItemCount = 0;

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


  addNewCartItem(){
    this.currentShopItemCount++;
    this.shoppingCartItemAdded.next(this.currentShopItemCount)
  }

   setShoppingCartItemCount(count:number){
    this.currentShopItemCount=count;
    this.shoppingCartItemAdded.next(this.currentShopItemCount);
  } 


  deleteProductsFromCart(key: string) {
    return this.http.delete<void>(
      `${this.urlFirebaseRealtimeDbApiDomain}/carts/${key}.json`
    );
  }
}
