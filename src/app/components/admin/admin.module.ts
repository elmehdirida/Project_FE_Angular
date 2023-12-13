import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import {RouterOutlet} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatBadgeModule} from "@angular/material/badge";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {AdminRoutingModule} from "./AdminRouting.module";
import {OrdersComponent} from "./orders/orders.component";
import {ProductsComponent} from "./products/products.component";
import {CategoriesComponent} from "./categories/categories.component";
import {DiscountsComponent} from "./discounts/discounts.component";
import {PaymentsComponent} from "./payments/payments.component";
import {HomeComponent} from "./home/home.component";
import {MatCardModule} from "@angular/material/card";
import {MatLineModule} from "@angular/material/core";



@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    OrdersComponent,
    ProductsComponent,
    CategoriesComponent,
    DiscountsComponent,
    PaymentsComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatBadgeModule,
    FormsModule,
    NgOptimizedImage,
    MatSidenavModule,
    MatListModule,
    AdminRoutingModule,
    MatCardModule,
    MatLineModule
  ]
})
export class AdminModule { }
