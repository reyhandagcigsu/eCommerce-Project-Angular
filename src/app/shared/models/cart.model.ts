import { IProduct } from './product.model';

export class Cart {
  id:number;
  productId:number;
  product:IProduct;
  quantity:number;
  key: string;
  userId?: string;
}