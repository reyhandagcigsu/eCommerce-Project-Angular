import { IProduct } from './product.model';

export interface ICart {
  id:number;
  productId:number;
  product:IProduct;
  quantity:number;
}