import { DataStorageService } from './../shared/data-storage.service';
import { Product } from './../components/products/product.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingServiceService {
  shoppingProducts: Product[] = [];
  shoppingCartChanged = new Subject<Product[]>();
  shoppingCartItemAdded = new Subject<number>(); 
  currentShopItemCount = 0;
  constructor() {}


  setProductsInCart(products: Product[]){
    this.shoppingProducts = [...products];
    this.shoppingCartChanged.next(this.shoppingProducts.slice());
  }

  getProducts() {
    return this.shoppingProducts.slice();
  }

  getProduct(id: number) {
    return this.shoppingProducts.find(p => p.id === id);
  }

  addNewCartItem(){
    this.currentShopItemCount++;
    this.shoppingCartItemAdded.next(this.currentShopItemCount)
  }

  setShoppingCartItemCount(count:number){
    this.currentShopItemCount=count;
    this.shoppingCartItemAdded.next(this.currentShopItemCount);
  }

  deleteCartItem(id : number) {
    this.shoppingProducts.filter( p => p.id !== id);
  }

}
