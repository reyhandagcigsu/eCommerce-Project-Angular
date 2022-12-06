import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../models/product.model';
import { ProductsService } from 'src/app/core/services/products.service';


@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {

  constructor(private productService: ProductsService){}

   transform(value: IProduct[], filterText: string, propName: string): IProduct[] {
    const result: any = [];
    if (!value || filterText === '' || propName === '') {
      return value;
    }
    value.forEach((a: any) => {
      if (a[propName].trim().toLowerCase().includes(filterText.toLowerCase())) {
        result.push(a);
      }
    });
    return result;
  } 
}
