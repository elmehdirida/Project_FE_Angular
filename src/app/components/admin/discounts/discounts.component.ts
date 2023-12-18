import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Category} from "../../../Model/Category";
import {CategoryServiceService} from "../../../services/category-service.service";
import {MatDialog} from "@angular/material/dialog";
import {EditCategoryDialogComponent} from "../../dialogs/edit-category-dialog/edit-category-dialog.component";
import {User} from "../../../Model/User";
import {ConfirmDialogComponent} from "../../dialogs/confirm-dialog/confirm-dialog.component";
import {Discount} from "../../../Model/Discount";
import {DiscountServiceService} from "../../../services/discount-service.service";
import {EditDiscountDialogComponent} from "../../dialogs/edit-discount-dialog/edit-discount-dialog.component";

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
              private dialog: MatDialog
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
      data: discount,
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
            this.getDiscounts();
          },
          (error)=>{
            console.log(error);
          }
        )
      }
    })
  }
}
