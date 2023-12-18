import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './produit/product.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatBadgeModule} from "@angular/material/badge";
import {MatCardModule} from "@angular/material/card";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatListModule} from "@angular/material/list";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSliderModule, MatSliderChange} from "@angular/material/slider";
import {MatSelectModule} from "@angular/material/select";
import { ProductDetailComponent } from './product-detail/product-detail.component';
import {MatDialogModule} from "@angular/material/dialog";
import { CommentComponent } from './comment/comment.component';



@NgModule({
  declarations: [
    HomeComponent,
    ProductComponent,
    ProductDetailComponent,
    CommentComponent,
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
    MatPaginatorModule,
    MatTableModule,
    MatListModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatSliderModule,
    MatSelectModule,
  ]
})
export class PagesModule {

}
