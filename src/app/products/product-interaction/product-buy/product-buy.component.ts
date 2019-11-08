import { Component, OnInit } from '@angular/core';
import { BuyingMessages } from '../../../shared/models/buying-message.model';
import * as ProductsActions from '../../store/products.actions';
import { ProductInteractionComponent } from '../product-interaction.component';

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
      this.product.soldCount++;
      this.store.dispatch(
        ProductsActions.saveCurrentProduct({ product: this.product })
      );
    }
  }

  public onContinue(): void {
    this.closeModalHandler();
  }
}
