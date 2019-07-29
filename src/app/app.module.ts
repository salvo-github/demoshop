import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorInterceptorService } from './error-interceptor.service';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CardListComponent } from './products/product-card/card-list/card-list.component';
import { CardPdpComponent } from './products/product-card/card-pdp/card-pdp.component';
import { CardRatingComponent } from './products/product-card/card-rating/card-rating.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { ProductAddQuantityComponent } from './products/product-detail/product-add-quantity/product-add-quantity.component';
import { ProductBuyComponent } from './products/product-detail/product-buy/product-buy.component';
import { ProductDeleteComponent } from './products/product-detail/product-delete/product-delete.component';
import { ProductDetailHeaderComponent } from './products/product-detail/product-detail-header/product-detail-header.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductEditComponent } from './products/product-detail/product-edit/product-edit.component';
import { ProductsFilterComponent } from './products/products-filter/products-filter.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { ImagePlaceholderDirective } from './shared/image-placeholder.directive';
import { LoginComponent } from './user/login/login.component';
import { UserAuthInterceptorService } from './user/user-auth-interceptor.service';

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
    ImagePlaceholderDirective,
    ProductAddQuantityComponent,
    CardRatingComponent,
    CardListComponent,
    CardPdpComponent,
    ProductDetailHeaderComponent
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
