import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { LoginComponent } from './user/login/login.component';
import { UserAuthInterceptorService } from './user/user-auth-interceptor.service';
import { ProductEditComponent } from './products/product-detail/product-edit/product-edit.component';
import { ProductsFilterComponent } from './products/products-filter/products-filter.component';
import { ProductDeleteComponent } from './products/product-detail/product-delete/product-delete.component';
import { ProductBuyComponent } from './products/product-detail/product-buy/product-buy.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { ErrorInterceptorService } from './error-interceptor.service';
import { ImagePlaceholderDirective } from './shared/image-placeholder.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductsListComponent,
    ProductDetailComponent,
    ProductCardComponent,
    PageNotFoundComponent,
    LoginComponent,
    ProductEditComponent,
    ProductsFilterComponent,
    ProductDeleteComponent,
    ProductBuyComponent,
    ServerErrorComponent,
    ImagePlaceholderDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserAuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
