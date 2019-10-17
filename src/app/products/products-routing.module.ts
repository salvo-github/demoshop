import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailResolver } from '../services/product-detail-resolver.service';
import { ProductsGuardService } from '../services/products-guard.service';
import { ProductsListResolver } from '../services/products-list-resolver.service';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsListComponent } from './products-list/products-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: ProductsListComponent,
        resolve: { products: ProductsListResolver }
      },
      {
        path: 'detail/:id',
        component: ProductDetailComponent,
        resolve: { product: ProductDetailResolver }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}
