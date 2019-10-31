import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CardActionsComponent } from './product-card/card-actions/card-actions.component';
import { CardFigureComponent } from './product-card/card-figure/card-figure.component';
import { CardInfoGroupComponent } from './product-card/card-info-group/card-info-group.component';
import { CardListComponent } from './product-card/card-list/card-list.component';
import { CardPdpComponent } from './product-card/card-pdp/card-pdp.component';
import { CardRatingComponent } from './product-card/card-rating/card-rating.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductAddQuantityComponent } from './product-detail/product-add-quantity/product-add-quantity.component';
import { ProductBuyComponent } from './product-detail/product-buy/product-buy.component';
import { ProductDeleteComponent } from './product-detail/product-delete/product-delete.component';
import { ProductDetailHeaderComponent } from './product-detail/product-detail-header/product-detail-header.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-detail/product-edit/product-edit.component';
import { ProductsFilterComponent } from './products-filter/products-filter.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListNavigationComponent } from './products-list/products-list-navigation/products-list-navigation.component';
import { StoreModule } from '@ngrx/store';
import { productsReducer } from './store/products.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './store/products.effects';

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductDetailComponent,
    ProductCardComponent,
    ProductEditComponent,
    ProductsFilterComponent,
    ProductDeleteComponent,
    ProductBuyComponent,
    ProductAddQuantityComponent,
    CardRatingComponent,
    CardListComponent,
    CardPdpComponent,
    ProductDetailHeaderComponent,
    CardFigureComponent,
    CardInfoGroupComponent,
    CardActionsComponent,
    ProductsListNavigationComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    StoreModule.forFeature('productsState', productsReducer),
    EffectsModule.forFeature([ProductsEffects])
  ]
})
export class ProductsModule {}
