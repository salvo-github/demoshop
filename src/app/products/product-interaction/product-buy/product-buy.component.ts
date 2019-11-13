import { Component, OnInit, Input } from '@angular/core';
import { BuyingMessages } from '../../../shared/models/buying-message.model';
import * as ProductsActions from '../../store/products.actions';
import { ProductInteractionComponent } from '../product-interaction.component';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-product-buy',
  templateUrl: './product-buy.component.html',
  styleUrls: ['./product-buy.component.scss']
})
export class ProductBuyComponent extends ProductInteractionComponent
  implements OnInit {
  public selledMessage = BuyingMessages.PRODUCT_SELLED;

  public ngOnInit() {
    if (this.product.count - this.product.soldCount > 0) {
      const productToUpdate = { ...this.product };
      ++productToUpdate.soldCount;
      this.store.dispatch(
        ProductsActions.saveCurrentProduct({ product: productToUpdate })
      );
    }
  }
}
