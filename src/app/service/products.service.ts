import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Product } from '../components/products/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  productsChanged = new Subject<Product[]>();
  public search = new BehaviorSubject<string>('');


  private products: Product[] = [];
  

  constructor() {}

  setProducts(products: Product[]) {
    this.products = products;
    this.productsChanged.next(this.products.slice());
    
  }

  getProducts() {
    return this.products.slice();
  }

  
  setProductsPerCategory(productsPerCat: Product[]) {
    this.products = productsPerCat;
    this.productsChanged.next(this.products.slice());

  }

  getProductsPerCategory() {
    return this.products.slice();
  }

  
  getProduct(id: number) {
    return this.products.find(p => p.id === id);
  }

  deleteProduct(index: number) {
    this.products.splice(index, 1);
    this.productsChanged.next(this.products.slice());
  }
}
