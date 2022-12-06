import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { IProduct } from 'src/app/shared/models/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, Pipe } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { AuthService } from './auth.service';
import { characterEditor } from '../helpers/text-modifiers';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  urlFakeStoreApiDomain: string = environment.apiDomain1;
  products: IProduct[] = [];
  productsChanged = new Subject<IProduct[]>();
  public search = new BehaviorSubject<string>('');
  errorMessage: string = '';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getProducts() {
    this.http
      .get<IProduct[]>(`${this.urlFakeStoreApiDomain}/products`)
      .pipe(
        tap((products) => {
          products.map((item) => {
            return { ...item, category: characterEditor(item.category) };
          });
        })
      )
      .subscribe((data: IProduct[]) => {
        this.products = data;
        this.productsChanged.next(this.products);
      });
  }

  getProduct(id: number) {
    return this.http.get<IProduct>(`${this.urlFakeStoreApiDomain}/products/${id}`);
  }

  getCategoryProducts(category: string) {
    this.http
      .get<IProduct[]>(`${this.urlFakeStoreApiDomain}/products/category/` + category)
      .subscribe((data: IProduct[]) => {
        this.products = data;
        this.productsChanged.next(this.products.slice());
      });
  }

  getMenAndWomenCategoryProducts() {
    const men = this.http.get<IProduct[]>(
      `${this.urlFakeStoreApiDomain}/products/category/men%27s%20clothing`
    );

    const women = this.http.get<IProduct[]>(
      `${this.urlFakeStoreApiDomain}/products/category/women%27s%20clothing`
    );

    const fashion = combineLatest(men, women)
      .pipe(
        tap((products) => {
          const products_: IProduct[] = [...products[0], ...products[1]];
          this.products = products_;
          this.productsChanged.next(products_);
        })
      )
      .subscribe();
  }
}
