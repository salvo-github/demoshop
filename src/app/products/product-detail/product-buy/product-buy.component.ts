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

@Component({
  selector: 'app-product-buy',
  templateUrl: './product-buy.component.html',
  styleUrls: ['./product-buy.component.scss']
})
export class ProductBuyComponent implements OnInit, OnDestroy {
  @Input() product: Product;
  @Output() closeModal = new EventEmitter<boolean>();
  selled = false;
  onBuyingMessage = 'The Product is out of stock';
  private saveProductSubscription: Subscription;

  constructor(private productService: ProductsService) {}

  ngOnInit() {
    if (this.product.count - this.product.soldCount > 0) {
      this.product.soldCount++;
      this.saveProductSubscription = this.productService
        .saveProduct(this.product)
        .subscribe(() => {
          this.selled = true;
          this.onBuyingMessage = 'You successfully purchased this item.';
        });
    }
  }

  ngOnDestroy() {
    if (this.saveProductSubscription) {
      this.saveProductSubscription.unsubscribe();
    }
  }

  afterBuying(): void {
    this.closeModal.emit(true);
  }
}
