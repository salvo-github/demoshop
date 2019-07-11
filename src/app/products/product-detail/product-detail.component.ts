import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: [
    './product-detail.component.scss',
    '../../../assets/scss/mediaquery.scss'
  ]
})
export class ProductDetailComponent implements OnInit {
  product: Product;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    if (this.route.snapshot.data.product === null) {
      return this.router.navigate(['/page-not-found'], {
        skipLocationChange: true
      });
    }
    this.product = this.route.snapshot.data.product;
  }
}
