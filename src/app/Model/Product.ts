import {Discount} from "./Discount";
import {Category} from "./Category";
import {Commentiare} from "./Commentiare";

export interface Product
{
  comments?: Commentiare[];
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
