import { Component, OnInit, Input, DoCheck, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesRef } from 'src/app/routes-ref.model';
import { Product } from '../../product.model';
import { Category } from '../../category.model';
import { ProductsService } from '../../products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-detail-header',
  templateUrl: './product-detail-header.component.html',
  styleUrls: ['./product-detail-header.component.scss']
})
export class ProductDetailHeaderComponent
  implements OnInit, DoCheck, OnDestroy {
  @Input() public product: Product;
  public category: Category;
  private fetchCategoryByIdSubscription: Subscription;

  constructor(
    private router: Router,
    private productService: ProductsService
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    if (this.fetchCategoryByIdSubscription) {
      this.fetchCategoryByIdSubscription.unsubscribe();
    }
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

  getProductCategory(): void {
    this.fetchCategoryByIdSubscription = this.productService
      .fetchCategoryById(this.product.categoryId)
      .subscribe((categoryResponse) => {
        this.category = categoryResponse;
      });
  }

  onGoBack(): void {
    this.router.navigate([RoutesRef.products]);
  }
}
