import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Category } from '../category.model';
import { ProductsService } from '../products.service';

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
  category: Category;
  backUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService
  ) {}

  ngOnInit() {
    if (this.route.snapshot.data.product === null) {
      return this.router.navigate(['/page-not-found'], {
        skipLocationChange: true
      });
    }
    this.product = this.route.snapshot.data.product;

    this.productService
      .fetchCategoryById(this.product.categoryId)
      .subscribe((categoryResponse) => {
        this.category = categoryResponse;
      });
  }
}
