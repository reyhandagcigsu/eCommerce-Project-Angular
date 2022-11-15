import { ProductsService } from './products.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../components/products/product.model';



@Injectable()
export class ProductResolverService implements Resolve<Product> {

    constructor(private productsService: ProductsService) {}

resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> | Promise<Product> | Product {
    return this.productsService.getProduct(+route.params['id']);
}
}