import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/auth/login/login.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import {HomeComponent} from "./components/pages/home/home.component";
import {ProductComponent} from "./components/pages/produit/product.component";
import {ProductDetailComponent} from "./components/pages/product-detail/product-detail.component";


const routes: Routes = [
  {
    "path": "product", component: ProductDetailComponent
  },
  {
    "path": "login", component: LoginComponent
  },
  {
    "path": "register", component: RegisterComponent
  },
  {
    "path": "home", component: HomeComponent
  },
  {
    "path" : "product", component: ProductComponent
  },
  {
    "path": "admin", loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule)
  },
  {
    "path": "", component : HomeComponent
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
