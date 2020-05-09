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
import { ThankyouComponent } from './pages/thankyou/thankyou.component';
// Importing libraries 
import { OwlModule } from 'ngx-owl-carousel';
import { bootstrap } from "bootstrap";
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { CartComponent } from './pages/cart/cart.component';
// admin routes
import { AuthComponent } from './pages/admin/auth/auth.component';
import { SidebarComponent } from './pages/admin/component/sidebar/sidebar.component';
import { AllProductsComponent } from './pages/admin/products/all-products/all-products.component';
import { AddProductsComponent } from './pages/admin/products/add-products/add-products.component';
import { AddCategoryComponent } from './pages/admin/categories/add-category/add-category.component';
import { AllCategoryComponent } from './pages/admin/categories/all-category/all-category.component';
import { AllOrdersComponent } from './pages/admin/orders/all-orders/all-orders.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { SettingsComponent } from './pages/admin/settings/settings.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
// modules start >>>
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
// import { NZ_I18N } from 'ng-zorro-antd/i18n';
// import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

registerLocaleData(en);

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
        CartComponent,
        AuthComponent,
        AllProductsComponent,
        AddProductsComponent,
        AddCategoryComponent,
        AllCategoryComponent,
        CheckoutComponent,
        ThankyouComponent,
        SidebarComponent,
        AllOrdersComponent,
        SettingsComponent,
        DashboardComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        OwlModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2SearchPipeModule,
        BrowserAnimationsModule,
        NgZorroAntdModule
    ],
    providers: [{ provide: NZ_I18N, useValue: en_US }],
    bootstrap: [AppComponent]
})
export class AppModule { }
