import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { IProduct } from 'src/app/shared/models/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, Pipe } from '@angular/core';
import { combineLatest, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { characterEditor } from '../helpers/text-modifiers';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  urlFakeStoreApiDomain: string = environment.FakeStoreApiDomain;
  products: IProduct[] = [];
  productsChanged = new Subject<IProduct[]>();
  public search = new BehaviorSubject<string>('');
  errorMessage: string = '';
  fashion: Observable<any>;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getProducts() {
    return this.http
      .get<IProduct[]>(`${this.urlFakeStoreApiDomain}/products`)
      .pipe(
        tap((products) => {
          products.map((item) => {
            return { ...item, category: characterEditor(item.category) };
          });
        })
      );
  }

  getProduct(id: number) {
    return this.http.get<IProduct>(
      `${this.urlFakeStoreApiDomain}/products/${id}`
    );
  }

  getCategoryProducts(category: string) {
    return this.http.get<IProduct[]>(
      `${this.urlFakeStoreApiDomain}/products/category/` + category
    );
  }

  getMenAndWomenCategoryProducts() {
    const men = this.http.get<IProduct[]>(
      `${this.urlFakeStoreApiDomain}/products/category/men%27s%20clothing`
    );

    const women = this.http.get<IProduct[]>(
      `${this.urlFakeStoreApiDomain}/products/category/women%27s%20clothing`
    );

    return (this.fashion = combineLatest(men, women));
  }
}
