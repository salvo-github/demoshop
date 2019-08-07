import { Component } from '@angular/core';
import { ProductCardComponent } from '../product-card.component';
import { AdminActions } from '../admin-actions.model';
import { ButtonsLabels } from 'src/app/shared/buttons/buttons-labels-model';

@Component({
  selector: 'app-card-pdp',
  templateUrl: './card-pdp.component.html',
  styleUrls: ['./card-pdp.component.scss']
})
export class CardPdpComponent extends ProductCardComponent {
  protected onBuying = false;

  protected toggleModal(): void {
    this.onBuying = !this.onBuying;
  }

  protected getProductAvailability(): number {
    return this.product.count - this.product.soldCount;
  }

  protected getActions() {
    return {
      [AdminActions.edit]: () => this.navigateTo(AdminActions.edit),
      [AdminActions.add]: () => this.navigateTo(AdminActions.add),
      [AdminActions.delete]: () => this.navigateTo(AdminActions.delete)
    };
  }

  protected getBuyLabel() {
    return ButtonsLabels.buy;
  }
}
