import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../product.model';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-product-buy',
  templateUrl: './product-buy.component.html',
  styleUrls: ['./product-buy.component.scss']
})
export class ProductBuyComponent implements OnInit {
  @Input() product: Product;
  @Output() closeModal = new EventEmitter<boolean>();
  selled = false;
  onBuyingMessage = 'The Product is out of stock';

  constructor(private productService: ProductsService) {}

  ngOnInit() {
    if (this.product.count - this.product.soldCount > 0) {
      this.product.soldCount += 1;
      this.productService.saveProduct(this.product).subscribe(() => {
        this.selled = true;
        this.onBuyingMessage = 'You successfully purchased this item.';
      });
    }
  }

  afterBuying() {
    this.closeModal.emit(true);
  }
}
