import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductsListResolver } from './products/products-list/products-list-resolver.service';
import { ProductCardResolver } from './products/product-card/product-card-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: '/products-list', pathMatch: 'full' },
  {
    path: 'products-list',
    component: ProductsListComponent,
    resolve: { productsList: ProductsListResolver }
  },
  {
    path: 'product-detail/:id',
    component: ProductDetailComponent,
    resolve: { product: ProductCardResolver }
  },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
