import {Product} from "./Product";

export interface  CartProduct{
  id : number;
  product : Product;
  quantity : number;
  order_id? : number;
  product_id : number;
}
