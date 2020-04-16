import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

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
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { CartComponent } from './pages/cart/cart.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        IndexComponent,
        ProductsComponent,
        BrandsComponent,
        AboutComponent,
        ContactComponent,
        ProductInfoComponent,
        CartComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        OwlModule,
        HttpClientModule,
        FormsModule,
        Ng2SearchPipeModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
