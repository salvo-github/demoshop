import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesRef } from 'src/app/routes-ref.model';
import { Category } from '../category.model';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, DoCheck {
  product: Product;
  category: Category;
  backUrl: string;
  RoutesRef = RoutesRef;

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
  }

  // update the cateogry after a product is edited
  ngDoCheck() {
    if (
      this.product &&
      (this.category === undefined ||
        this.category.id !== this.product.categoryId)
    ) {
      this.getProductCategory();
    }
  }

  getProductCategory() {
    this.productService
      .fetchCategoryById(this.product.categoryId)
      .subscribe((categoryResponse) => {
        this.category = categoryResponse;
      });
  }

  onGoBack() {
    this.router.navigate([RoutesRef.products]);
  }
}
