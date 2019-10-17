import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { LoginGuardService } from './services/login-guard.service';
import { ProductsGuardService } from './services/products-guard.service';
import { ProductsListResolver } from './services/products-list-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    canLoad: [LoginGuardService]
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.module').then(m => m.ProductsModule),
    canLoad: [ProductsGuardService]
  },
  { path: 'server-error', component: ServerErrorComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
