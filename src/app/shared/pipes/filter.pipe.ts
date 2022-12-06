import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../models/product.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
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
