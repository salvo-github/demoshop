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
    ProductEditComponent
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
      useClass: UserAuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
