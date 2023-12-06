import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ProduitComponent } from './produit/produit.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatBadgeModule} from "@angular/material/badge";
import {MatCardModule} from "@angular/material/card";
import {MatPaginatorModule} from "@angular/material/paginator";



@NgModule({
  declarations: [
    HomeComponent,
    ProduitComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatCardModule,
    MatPaginatorModule
  ]
})
export class PagesModule { }
