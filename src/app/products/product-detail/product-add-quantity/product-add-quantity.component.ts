import { Component, OnInit } from '@angular/core';
import { Product } from '../../product.model';
import { RoutesRef } from 'src/app/routes-ref.model';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-product-add-quantity',
  templateUrl: './product-add-quantity.component.html',
  styleUrls: ['./product-add-quantity.component.scss']
})
export class ProductAddQuantityComponent implements OnInit {
  product: Product;
  RoutesRef = RoutesRef;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.product = this.route.snapshot.data.product;
  }

  onUpdate() {
    this.product.count += 5;
    this.productService.saveProduct(this.product).subscribe((resp) => {
      this.router.navigate(this.getBackUrl());
    });
  }

  onCancel() {
    this.router.navigate(this.getBackUrl());
  }

  getBackUrl() {
    return this.route.snapshot.parent.url.map((urlSegment: UrlSegment) => {
      return urlSegment.path;
    });
  }
}
