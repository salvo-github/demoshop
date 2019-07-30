import { Component } from '@angular/core';
import { ProductCardComponent } from '../product-card.component';

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
      edit: this.getLink.bind(this, 'edit'),
      ['add five product']: this.getLink.bind(this, 'add'),
      delete: this.getLink.bind(this, 'delete')
    };
  }
}
