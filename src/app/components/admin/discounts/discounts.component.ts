import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../dialogs/confirm-dialog/confirm-dialog.component";
import {Discount} from "../../../Model/Discount";
import {DiscountServiceService} from "../../../services/discount-service.service";
import {EditDiscountDialogComponent} from "../../dialogs/edit-discount-dialog/edit-discount-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss']
})
export class DiscountsComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource! : MatTableDataSource<Discount>
  discounts  : Discount[]=[]
  displayedColumns: string[] = ['id', 'code','discount','start_date','end_date','edit','delete'];
  constructor(private discountService: DiscountServiceService,
              private dialog: MatDialog,
              private _snackbar : MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.getDiscounts();
  }

  getDiscounts(){
    this.discountService.getDiscounts().subscribe((data: any)=>{
        this.discounts = data.data;
        this.dataSource = new MatTableDataSource(this.discounts);
        this.dataSource.paginator = this.paginator;
      }
    )

  }


  editDiscount(discount:Discount) {
    let Ref = this.dialog.open(EditDiscountDialogComponent, {
      data: {discount: discount, mode: "edit"},
      width: '600px',
    })
    Ref.afterClosed().subscribe((result)=>{
      if (result) {
        this.getDiscounts();
      }
    })
  }

  deleteDiscount(discount:Discount) {
    let Ref = this.dialog.open(ConfirmDialogComponent, {
      data: "Are you sure you want to delete this Discount ?",
    })
    Ref.afterClosed().subscribe((result)=>{
      if (result) {
        this.discountService.deleteDiscount(discount.id).subscribe((data: any)=>{
            this._snackbar.open("Discount Deleted Successfully", "Close", {
              duration: 2000,
            });
            this.getDiscounts();
          },
          (error)=>{
            this._snackbar.open("Error Deleting Discount", "Close", {
              duration: 2000,
            });
            console.log(error);
          }
        )
      }
    })
  }

  addDiscount() {
    let Ref = this.dialog.open(EditDiscountDialogComponent, {
      data: {mode: "add"},
      width: '600px',
    })
    Ref.afterClosed().subscribe((result)=>{
      if (result) {
        this.getDiscounts();
      }
    })

  }
}
