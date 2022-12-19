import { IProduct } from './product.model';

export class Cart {
  public id?: number;
  public productId: number;
  public product: IProduct;
  public quantity: number;
  public key?: string;
  public userId?: string;

  constructor(
    productId: number,
    product: IProduct,
    quantity: number,
    key?: string,
    id?: number,
    userId?: string
  ) {
    this.productId = productId;
    this.product = product;
    this.quantity = quantity;
    this.key = key;
    this.id = id;
    this.userId = userId;
  }
}

/* export class Cart {
  public id?:number;
  public productId:number;
  public product:IProduct;
  public  quantity:number;
  public key: string;
  public userId?: string;
}
 */
