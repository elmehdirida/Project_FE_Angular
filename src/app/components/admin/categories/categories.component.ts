import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../../Model/User";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../dialogs/confirm-dialog/confirm-dialog.component";
import {Category} from "../../../Model/Category";
import {CategoryServiceService} from "../../../services/category-service.service";
import {EditCategoryDialogComponent} from "../../dialogs/edit-category-dialog/edit-category-dialog.component";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource! : MatTableDataSource<Category>
  category  : Category[]=[]
  displayedColumns: string[] = ['id', 'name','description', 'edit', 'delete'];
  constructor(private categoryService: CategoryServiceService,
              private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe((data: any)=>{
      console.log(data);
        this.category = data.data;
        this.dataSource = new MatTableDataSource(this.category);
        this.dataSource.paginator = this.paginator;
      }
    )

  }


  editCategory(category:Category) {
    let Ref = this.dialog.open(EditCategoryDialogComponent, {
      data: {category: category, mode: "edit"},
      width: '600px',
    })
    Ref.afterClosed().subscribe((result)=>{
      if (result) {
        this.getCategories();
      }
    })
  }

  deleteCategory(user:User) {
    let Ref = this.dialog.open(ConfirmDialogComponent, {
      data: "Are you sure you want to delete this Category ?",
    })
    Ref.afterClosed().subscribe((result)=>{
      if (result) {
        this.categoryService.deleteCategory(user.id).subscribe((data: any)=>{
            this.getCategories();
          },
          (error)=>{
            console.log(error);
          }
        )
      }
    })
  }

  addCategory() {
    let Ref = this.dialog.open(EditCategoryDialogComponent, {
      data: {mode: "add"},
      width: '600px',
    })
    Ref.afterClosed().subscribe((result)=>{
      if (result) {
        this.getCategories();
      }
    })

  }
}
