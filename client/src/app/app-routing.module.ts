import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { AboutComponent } from './pages/about/about.component';
import { ProductsComponent } from './pages/products/products.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { CartComponent } from './pages/cart/cart.component';

const routes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'about', component: AboutComponent},
    { path: 'products', component: ProductsComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'brands', component: BrandsComponent},
    { path: 'cart', component: CartComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
