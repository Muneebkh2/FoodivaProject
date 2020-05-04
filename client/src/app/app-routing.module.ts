import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { AboutComponent } from './pages/about/about.component';
import { ProductsComponent } from './pages/products/products.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ThankyouComponent } from './pages/thankyou/thankyou.component';
// admin routes
import { AuthComponent } from './pages/admin/auth/auth.component';
import { AllProductsComponent } from './pages/admin/products/all-products/all-products.component';
import { AddProductsComponent } from './pages/admin/products/add-products/add-products.component';
import { AllCategoryComponent } from './pages/admin/categories/all-category/all-category.component';
import { AddCategoryComponent } from './pages/admin/categories/add-category/add-category.component';

const routes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'about', component: AboutComponent},
    { path: 'products', component: ProductsComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'brands', component: BrandsComponent},
    { path: 'cart', component: CartComponent},
    { path: 'checkout', component: CheckoutComponent},
    { path: 'thank-you-for-order', component: ThankyouComponent},
    // admin routes
    { path: 'admin/login', component: AuthComponent},
    { path: 'admin/products/all', component: AllProductsComponent},
    { path: 'admin/products/add', component: AddProductsComponent},
    { path: 'admin/category/all', component: AllCategoryComponent},
    { path: 'admin/category/add', component: AddCategoryComponent},
    // { path: 'admin/login', component: AuthComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
