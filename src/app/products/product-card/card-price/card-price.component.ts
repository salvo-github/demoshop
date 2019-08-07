import { Component, OnInit, Input } from '@angular/core';
import { CardPriceInfoMessages } from './card-price-info-messages.model';

@Component({
  selector: 'app-card-price',
  templateUrl: './card-price.component.html',
  styleUrls: ['./card-price.component.scss']
})
export class CardPriceComponent implements OnInit {
  @Input() public price: number;
  @Input() public quantity: number;

  public constructor() {}

  public ngOnInit() {}

  public getQuantityInfo() {
    if (this.quantity !== undefined) {
      if (!this.quantity) {
        return CardPriceInfoMessages.soldOut;
      }
      return `(${this.quantity} ${CardPriceInfoMessages.itemsLeft})`;
    }
  }
}
