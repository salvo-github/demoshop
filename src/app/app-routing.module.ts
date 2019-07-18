import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductDetailResolver } from './products/product-detail/product-detail-resolver.service';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductEditComponent } from './products/product-detail/product-edit/product-edit.component';
import { ProductsGuardService } from './products/products-guard.service';
import { ProductsListResolver } from './products/products-list/products-list-resolver.service';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { LoginGuardService } from './user/login/login-guard.service';
import { LoginComponent } from './user/login/login.component';
import { ProductDeleteComponent } from './products/product-detail/product-delete/product-delete.component';

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
    canActivate: [ProductsGuardService],
    resolve: { products: ProductsListResolver },
    children: [
      {
        path: 'new',
        component: ProductEditComponent
      }
    ]
  },
  {
    path: 'product-detail/:id',
    component: ProductDetailComponent,
    canActivate: [ProductsGuardService],
    resolve: { product: ProductDetailResolver },
    canActivateChild: [ProductsGuardService],
    children: [
      {
        path: 'edit',
        component: ProductEditComponent,
        resolve: { product: ProductDetailResolver }
      },
      {
        path: 'delete',
        component: ProductDeleteComponent,
        resolve: { product: ProductDetailResolver }
      }
    ]
  },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
