import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../../Model/User";
import {UserServiceService} from "../../../services/user-service.service";
import {MatDialog} from "@angular/material/dialog";
import {EditUserDialogComponent} from "../../dialogs/edit-user-dialog/edit-user-dialog.component";
import {ConfirmDialogComponent} from "../../dialogs/confirm-dialog/confirm-dialog.component";
import {Order} from "../../../Model/Order";
import {OrderServiceService} from "../../../services/order-service.service";
import {
  ShowProductsOrderDialogComponent
} from "../../dialogs/show-products-order-dialog/show-products-order-dialog.component";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource! : MatTableDataSource<Order>
  orders : Order[]=[]
  displayedColumns: string[] = ['id', 'order Date', 'total Amount','Status','View Products', 'delete'];
  constructor(private orderService: OrderServiceService,
              private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.orderService.getOrders().subscribe((data: any)=>{
        this.orders = data.data;
        this.dataSource = new MatTableDataSource(this.orders);
        this.dataSource.paginator = this.paginator;
      }
    )

  }


  deleteOrder(order:Order) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: "Are you sure you want to delete this order ?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.orderService.deleteOrder(order.id).subscribe((data: any)=>{
          this.getOrders();
        },(error)=>{
          console.log(error);
        })
      }
    });

  }

  viewOrders(order:Order) {
    const dialogRef =this.dialog.open(ShowProductsOrderDialogComponent, {
      width: '600px',
      data: order
    });
  }

  statusColors(order:string) {
    if(order == "processing"){
      return "yellow"
    }else if(order == "completed"){
      return "green"
    }else{
      return "red"
    }
  }
}
