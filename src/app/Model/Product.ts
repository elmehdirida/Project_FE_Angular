import {Discount} from "./Discount";
import {Category} from "./Category";

export interface Product
{
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  discount?: Discount;
  category?: Category;
}
