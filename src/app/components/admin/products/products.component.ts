import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../../Model/User";
import {UserServiceService} from "../../../services/user-service.service";
import {MatDialog} from "@angular/material/dialog";
import {EditUserDialogComponent} from "../../dialogs/edit-user-dialog/edit-user-dialog.component";
import {ConfirmDialogComponent} from "../../dialogs/confirm-dialog/confirm-dialog.component";
import {Product} from "../../../Model/Product";
import {ProductService} from "../../../services/product.service";
import {EditProductDialogComponent} from "../../dialogs/edit-product-dialog/edit-product-dialog.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource! : MatTableDataSource<Product>
  products : Product[]=[]
  displayedColumns: string[] = ['id','name', 'price', 'category', 'discount','image', 'edit', 'delete'];
  constructor(private productService: ProductService,
              private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts().subscribe((data: any)=>{
        this.products = data.data;
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.paginator = this.paginator;
      }
    )

  }


  editProduct(product:Product) {
    let Ref = this.dialog.open(EditProductDialogComponent, {
      data: product,
      width: '600px',
    })
    Ref.afterClosed().subscribe((result)=>{
      if (result) {
        this.getProducts();
      }
    })
  }

  deleteProduct(product:Product) {
    let Ref = this.dialog.open(ConfirmDialogComponent, {
      data: "Are you sure you want to delete this Product ?",
    })
    Ref.afterClosed().subscribe((result)=>{
      if (result) {
        this.productService.deleteProduct(product.id).subscribe((data: any)=>{
            this.getProducts();
          },
          (error)=>{
            console.log(error);
          }
        )
      }
    })
  }

}
