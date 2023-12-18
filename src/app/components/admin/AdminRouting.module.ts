import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AdminComponent} from "./admin.component";
import {UsersComponent} from "./users/users.component";
import {OrdersComponent} from "./orders/orders.component";
import {CategoriesComponent} from "./categories/categories.component";
import {DiscountsComponent} from "./discounts/discounts.component";
import {PaymentsComponent} from "./payments/payments.component";
import {HomeComponent} from "./home/home.component";
import {ProductComponent} from "../pages/produit/product.component";
import {ProductsComponent} from "./products/products.component";


const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      {
        path: 'users', component: UsersComponent
      },
      {
        path: 'orders', component: OrdersComponent
      },
      {
        path: 'products', component: ProductsComponent
      },
      {
        path: 'categories', component: CategoriesComponent
      },
      {
        path: 'discounts' , component : DiscountsComponent
      },
      {
        path: 'payments', component: PaymentsComponent
      },
      {
        path: 'dashboard', component: HomeComponent
      },
      {
        path: '', redirectTo: 'dashboard', pathMatch: "full"
      }
    ]
  }
  ];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
