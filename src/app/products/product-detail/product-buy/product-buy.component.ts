import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { Product } from '../../product.model';
import { ProductsService } from '../../products.service';
import { Subscription } from 'rxjs';
import { BuyingMessages } from './buying-message.model';

@Component({
  selector: 'app-product-buy',
  templateUrl: './product-buy.component.html',
  styleUrls: ['./product-buy.component.scss']
})
export class ProductBuyComponent implements OnInit, OnDestroy {
  @Input() private product: Product;
  @Output() private closeModal = new EventEmitter<boolean>();

  private saveProductSubscription: Subscription;

  public selled = false;
  public onBuyingMessage = BuyingMessages.NO_PRODUCT;

  public constructor(private productService: ProductsService) {}

  public ngOnInit() {
    if (this.product.count - this.product.soldCount > 0) {
      this.product.soldCount++;
      this.saveProductSubscription = this.productService
        .saveProduct(this.product)
        .subscribe(() => {
          this.selled = true;
          this.onBuyingMessage = BuyingMessages.PRODUCT_SELLED;
        });
    }
  }

  public ngOnDestroy() {
    if (this.saveProductSubscription) {
      this.saveProductSubscription.unsubscribe();
    }
  }

  public afterBuying(): void {
    this.closeModal.emit(true);
  }
}
