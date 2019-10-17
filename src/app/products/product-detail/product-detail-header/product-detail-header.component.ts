import { Component, OnInit, Input, DoCheck, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesRef } from 'src/app/shared/models/routes-ref.model';
import { Product } from '../../../shared/models/product.model';
import { Category } from '../../../shared/models/category.model';
import { ProductsService } from '../../../services/products.service';
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

  public constructor(
    private router: Router,
    private productService: ProductsService
  ) {}

  public ngOnInit() {}

  public ngOnDestroy() {
    if (this.fetchCategoryByIdSubscription) {
      this.fetchCategoryByIdSubscription.unsubscribe();
    }
  }

  // update the cateogry after a product is edited
  public ngDoCheck() {
    if (
      this.product &&
      (this.category === undefined ||
        this.category.id !== this.product.categoryId)
    ) {
      this.getProductCategory();
    }
  }

  public getProductCategory(): void {
    this.fetchCategoryByIdSubscription = this.productService
      .fetchCategoryById(this.product.categoryId)
      .subscribe(categoryResponse => {
        this.category = categoryResponse;
      });
  }

  public onGoBack(): void {
    this.router.navigate([RoutesRef.products]);
  }
}
