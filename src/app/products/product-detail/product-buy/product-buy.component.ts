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

  constructor(private productService: ProductsService) {}

  ngOnInit() {
    this.product.soldCount += 1;
    this.productService.saveProduct(this.product);
  }

  afterBuying() {
    this.closeModal.emit(true);
  }
}
