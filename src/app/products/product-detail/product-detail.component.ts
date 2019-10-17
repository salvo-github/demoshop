import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  protected product: Product;

  public constructor(private route: ActivatedRoute, private router: Router) {}

  public ngOnInit() {
    if (this.route.snapshot.data.product === null) {
      return this.router.navigate(['/page-not-found'], {
        skipLocationChange: true
      });
    }
    this.product = this.route.snapshot.data.product;
  }
}
