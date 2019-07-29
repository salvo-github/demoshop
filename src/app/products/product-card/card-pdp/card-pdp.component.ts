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
}
