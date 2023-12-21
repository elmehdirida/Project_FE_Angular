import {Discount} from "./Discount";
import {Category} from "./Category";

export interface Product
{
  comments?: Comment[];
  id?: number;
  name: string;
  price: number;
  image: string;
  description: string;
  stock: number;
  discount_id:number;
  category_id : number;
  discount?: Discount;
  category?: Category;
  totalRating?:number;
  rating: number;
}
