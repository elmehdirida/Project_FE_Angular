import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {OrderServiceService} from "../../../services/order-service.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../dialogs/confirm-dialog/confirm-dialog.component";

import {Payment} from "../../../Model/Payment";
import {PaymentServiceService} from "../../../services/payment-service.service";
import {MatSnackBar} from "@angular/material/snack-bar";

export enum PaymentMessage {
  accept = "Are you sure you want to accept this payment ?",
  decline = "Are you sure you want to decline this payment ?"
}
export enum PaymentMode {
  accept = "accept",
  decline = "decline"
}

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})

export class PaymentsComponent implements OnInit ,AfterViewInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('processingPaginator') processingPaginator!: MatPaginator;
  @ViewChild('completedPaginator') completedPaginator!: MatPaginator;
  @ViewChild('declinedPaginator') declinedPaginator!: MatPaginator;
  dataSource!: MatTableDataSource<Payment>
  processingDataSource!: MatTableDataSource<Payment>
  completedDataSource!: MatTableDataSource<Payment>
  declinedDataSource!: MatTableDataSource<Payment>
  payments: Payment[] = []
  displayedColumns: string[] = ['id', 'order_id', 'payment_method', 'payment_status', 'Amount', 'Accept', 'decline'];

  constructor(private orderService: OrderServiceService,
              private paymentService: PaymentServiceService,
              private dialog: MatDialog,
              private _snackbar : MatSnackBar
  ) {
    //initialize the dataSource
    this.dataSource = new MatTableDataSource<Payment>([])
    this.processingDataSource = new MatTableDataSource<Payment>([])
    this.completedDataSource = new MatTableDataSource<Payment>([])
    this.declinedDataSource = new MatTableDataSource<Payment>([])
  }

  ngOnInit(): void {
    this.getPayments();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.processingDataSource.paginator = this.processingPaginator;
    this.completedDataSource.paginator = this.completedPaginator;
    this.declinedDataSource.paginator = this.declinedPaginator;
  }

  getPayments() {
    this.paymentService.getPayments().subscribe((data: any) => {
        this.payments = data.data;
        this.dataSource = new MatTableDataSource(this.payments);
        this.dataSource.paginator = this.paginator;
        this.processingDataSource = new MatTableDataSource(this.payments.filter((payment) => payment.payment_status == "processing"));
        this.processingDataSource.paginator = this.processingPaginator;
        this.completedDataSource = new MatTableDataSource(this.payments.filter((payment) => payment.payment_status == "completed"));
        this.completedDataSource.paginator = this.completedPaginator;
        this.declinedDataSource = new MatTableDataSource(this.payments.filter((payment) => payment.payment_status == "declined"));
        this.declinedDataSource.paginator = this.declinedPaginator;

      }
    )

  }


  openConfirmation(data: string , mode:string ,id :number): boolean {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if(mode == "accept"){
          this.acceptPayment(id);
        }else if(mode == "decline"){
          this.rejectPayment(id);
        }
      }
    });
    return true;
  }

  statusColors(order: string) {
    if (order == "processing") {
      return "yellow"
    } else if (order == "completed") {
      return "green"
    } else {
      return "red"
    }
  }

  acceptPayment(id: number) {
    let payment = this.payments.find((payment) => payment.id == id);
    if (payment) {
        payment.payment_status = "completed";
        console.log(payment);
        this.paymentService.updatePayment(payment.id!, payment).subscribe((data: any) => {
            this.orderService.getOrder(payment?.order_id!).subscribe((data: any) => {
              let order = data.data;
              order.order_status = "completed";
              this.orderService.updateOrder(order).subscribe((data: any) => {
              }, (error) => {
                console.log(error);
              })
            }
          )
          this._snackbar.open("Payment Accepted Successfully", "Close", {
            duration: 2000,
          });
          this.getPayments();

        }, (error) => {
          this._snackbar.open("Error Accepting Payment", "Close", {
            duration: 2000,
          });
          console.log(error);
        })
    }
  }

  rejectPayment(id: number) {
    let payment = this.payments.find((payment) => payment.id == id);
    if (payment) {
        payment!.payment_status = "declined";
        this.paymentService.updatePayment(payment.id!, payment).subscribe((data: any) => {
            this.orderService.getOrder(payment?.order_id!).subscribe((data: any) => {
              let order = data.data;
              order.order_status = "declined";
              this.orderService.updateOrder(order).subscribe((data: any) => {
              }, (error) => {
                console.log(error);
              })
            }
          )
          this._snackbar.open("Payment Declined Successfully", "Close", {
            duration: 2000,
          });
          this.getPayments();
        }, (error) => {
          this._snackbar.open("Error Declining Payment", "Close", {
            duration: 2000,
          });
          console.log(error);
        })
      }
    }

  protected readonly PaymentMessage = PaymentMessage;
  protected readonly PaymentMode = PaymentMode;
}
