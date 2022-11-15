import { Product } from './../components/products/product.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: Product[], filterText: string, propName: string): Product[] {

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
