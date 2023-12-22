export interface  Payment{
  id? : number,
  order_id : number,
  amount : number,
  payment_method : string,
  payment_status : string
}
