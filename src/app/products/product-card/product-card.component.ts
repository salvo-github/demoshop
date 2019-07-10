import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product.model';
import { ActivatedRoute, Router, Data } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    if (typeof this.product === 'undefined') {
      this.route.data.subscribe((productResolved: Data) => {
        if (productResolved.product === null) {
          return this.router.navigate(['/page-not-found'], {
            skipLocationChange: true
          });
        } else {
          this.product = productResolved.product;
        }
      });
    }
  }
}
