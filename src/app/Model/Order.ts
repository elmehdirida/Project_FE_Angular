import {Product} from "./Product";

export interface  Order{
  id : number,
  order_date : Date,
  total_amount : number,
  order_status : String ,
  user_id : number,
  products : Product[]
}
