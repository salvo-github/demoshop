import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { CardActionsComponent } from './product-card/card-actions/card-actions.component';
import { CardFigureComponent } from './product-card/card-figure/card-figure.component';
import { CardInfoGroupComponent } from './product-card/card-info-group/card-info-group.component';
import { CardListComponent } from './product-card/card-list/card-list.component';
import { CardPdpComponent } from './product-card/card-pdp/card-pdp.component';
import { CardRatingComponent } from './product-card/card-rating/card-rating.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductDetailHeaderComponent } from './product-detail/product-detail-header/product-detail-header.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductAddQuantityComponent } from './product-interaction/product-add-quantity/product-add-quantity.component';
import { ProductBuyComponent } from './product-interaction/product-buy/product-buy.component';
import { ProductDeleteComponent } from './product-interaction/product-delete/product-delete.component';
import { ProductEditComponent } from './product-interaction/product-edit/product-edit.component';
import { ProductInteractionComponent } from './product-interaction/product-interaction.component';
import { ProductsFilterComponent } from './products-filter/products-filter.component';
import { ProductsListNavigationComponent } from './products-list/products-list-navigation/products-list-navigation.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsEffects } from './store/products.effects';
import { productsReducer, PRODUCTS_STATE_KEY } from './store/products.reducer';

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
    ProductsListNavigationComponent,
    ProductInteractionComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    StoreModule.forFeature(PRODUCTS_STATE_KEY, productsReducer),
    EffectsModule.forFeature([ProductsEffects])
  ]
})
export class ProductsModule {}
