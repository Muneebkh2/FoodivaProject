import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from "./guards/auth-guard.service";
import { RoleGuardService } from "./guards/role-guard.service";
// pages start
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
import { AllOrdersComponent } from './pages/admin/orders/all-orders/all-orders.component';
import { ViewOrderComponent } from './pages/admin/orders/view-order/view-order.component';
import { SettingsComponent } from './pages/admin/settings/settings.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';

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
    { path: 'admin/products/all', component: AllProductsComponent, canActivate: [AuthGuardService] },
    { path: 'admin/products/add', component: AddProductsComponent, canActivate: [AuthGuardService] },
    { path: 'admin/category/all', component: AllCategoryComponent, canActivate: [AuthGuardService] },
    { path: 'admin/category/add', component: AddCategoryComponent, canActivate: [AuthGuardService] },
    { path: 'admin/orders/all', component: AllOrdersComponent, canActivate: [AuthGuardService] },
    { path: 'admin/orders/:ID', component: ViewOrderComponent, canActivate: [AuthGuardService] },
    { path: 'admin/settings', component: SettingsComponent, canActivate: [AuthGuardService] },
    { path: 'admin/dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
