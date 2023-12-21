import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {EditCategoryDialogComponent} from "./edit-category-dialog/edit-category-dialog.component";
import {EditDiscountDialogComponent} from "./edit-discount-dialog/edit-discount-dialog.component";
import {EditProductDialogComponent} from "./edit-product-dialog/edit-product-dialog.component";
import {EditUserDialogComponent} from "./edit-user-dialog/edit-user-dialog.component";
import {MatInputModule} from "@angular/material/input";
import {MatTooltipModule} from "@angular/material/tooltip";
import {ReactiveFormsModule} from "@angular/forms";
import {ConfirmDialogComponent} from "./confirm-dialog/confirm-dialog.component";
import { ShowProductsOrderDialogComponent } from './show-products-order-dialog/show-products-order-dialog.component';
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatProgressBarModule} from "@angular/material/progress-bar";




@NgModule({
  declarations: [
    CartComponent,
    EditCategoryDialogComponent,
    EditDiscountDialogComponent,
    EditProductDialogComponent,
    EditUserDialogComponent,
    ConfirmDialogComponent,
    ShowProductsOrderDialogComponent
  ],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatCardModule,
        MatTableModule,
        MatIconModule,
        MatListModule,
        MatInputModule,
        MatTooltipModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatProgressBarModule,

    ]
})
export class DialogsModule { }
