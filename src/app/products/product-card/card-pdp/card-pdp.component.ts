import { Component } from '@angular/core';
import { AdminActions } from '../../../shared/models/admin-actions.model';
import { ProductInteractionType } from '../../../shared/models/product-interaction-type.model';
import { ProductCardComponent } from '../product-card.component';

@Component({
  selector: 'app-card-pdp',
  templateUrl: './card-pdp.component.html',
  styleUrls: ['./card-pdp.component.scss']
})
export class CardPdpComponent extends ProductCardComponent {
  protected getProductAvailability(): number {
    return this.product.count - this.product.soldCount;
  }

  protected getAdminActions() {
    return {
      [AdminActions.edit]: () => {
        this.productInteractionType = ProductInteractionType.edit;
      },

      [AdminActions.add]: () => {
        this.productInteractionType = ProductInteractionType.addQuantity;
      },

      [AdminActions.delete]: () => {
        this.productInteractionType = ProductInteractionType.delete;
      }
    };
  }

  protected onBuy(): void {
    this.productInteractionType = ProductInteractionType.buy;
  }
}
