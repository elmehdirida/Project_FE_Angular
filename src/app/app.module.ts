import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {AuthModule} from "./components/auth/auth.module";
import {DialogsModule} from "./components/dialogs/dialogs.module";
import {MatDialogModule} from "@angular/material/dialog";
import {PagesModule} from "./components/pages/pages.module";
import {AdminModule} from "./components/admin/admin.module";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCardModule} from "@angular/material/card";
import {Interceptor} from "./http-interceptor/Intererceptor";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    MatSlideToggleModule,
    FormsModule,
    AuthModule,
    DialogsModule,
    MatDialogModule,
    PagesModule,
    AdminModule,
    MatPaginatorModule,
    MatCardModule,
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi   : true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
