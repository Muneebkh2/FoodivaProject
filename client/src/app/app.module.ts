import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { IndexComponent } from './pages/index/index.component';
import { ProductsComponent } from './pages/products/products.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
// Importing libraries 
import { OwlModule } from 'ngx-owl-carousel';
import { bootstrap } from "bootstrap";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    IndexComponent,
    ProductsComponent,
    BrandsComponent,
    AboutComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OwlModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
