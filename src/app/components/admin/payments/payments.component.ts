import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {OrderServiceService} from "../../../services/order-service.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../dialogs/confirm-dialog/confirm-dialog.component";

import {Payment} from "../../../Model/Payment";
import {PaymentServiceService} from "../../../services/payment-service.service";

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

export class PaymentsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Payment>
  payments: Payment[] = []
  displayedColumns: string[] = ['id', 'order_id', 'payment_method', 'payment_status', 'Amount', 'Accept', 'decline'];

  constructor(private orderService: OrderServiceService,
              private paymentService: PaymentServiceService,
              private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getPayments();
  }

  getPayments() {
    this.paymentService.getPayments().subscribe((data: any) => {
        this.payments = data.data;
        this.dataSource = new MatTableDataSource(this.payments);
        this.dataSource.paginator = this.paginator;
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
        payment!.payment_status = "completed";
        this.paymentService.updatePayment(payment.id, payment).subscribe((data: any) => {
          this.getPayments();
        }, (error) => {
          console.log(error);
        })
    }
  }

  rejectPayment(id: number) {
    let payment = this.payments.find((payment) => payment.id == id);
    if (payment) {
        payment!.payment_status = "declined";
        this.paymentService.updatePayment(payment.id, payment).subscribe((data: any) => {
          this.getPayments();
        }, (error) => {
          console.log(error);
        })
      }
    }

  protected readonly PaymentMessage = PaymentMessage;
  protected readonly PaymentMode = PaymentMode;
}
