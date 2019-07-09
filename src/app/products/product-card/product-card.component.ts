import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  @Input() productIndex: number;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    if (typeof this.product === 'undefined') {
      if (typeof this.productIndex === 'undefined') {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
          this.productIndex = +paramMap.get('id');
        });
      }
      this.productsService
        .fetchProduct(this.productIndex)
        .subscribe((product) => {
          this.product = product;
        });
    }
    if (typeof this.product === 'undefined') {
      this.router.navigate(['/page-not-found']);
    }
  }
}
