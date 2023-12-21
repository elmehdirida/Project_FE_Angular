export interface Discount {
  id?: number;
  code: string;
  discount: number;
  start_date: Date;
  end_date: Date;
}
