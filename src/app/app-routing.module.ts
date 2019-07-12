import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductsListResolver } from './products/products-list/products-list-resolver.service';
import { ProductDetailResolver } from './products/product-detail/product-detail-resolver.service';
import { LoginComponent } from './user/login/login.component';
import { LoginGuardService } from './user/login/login-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/products-list', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuardService]
  },
  {
    path: 'products-list',
    component: ProductsListComponent,
    resolve: { products: ProductsListResolver }
  },
  {
    path: 'product-detail/:id',
    component: ProductDetailComponent,
    resolve: { product: ProductDetailResolver }
  },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
