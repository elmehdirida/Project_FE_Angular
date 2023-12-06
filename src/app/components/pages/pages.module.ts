import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ProduitComponent } from './produit/produit.component';



@NgModule({
  declarations: [
    HomeComponent,
    ProduitComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
