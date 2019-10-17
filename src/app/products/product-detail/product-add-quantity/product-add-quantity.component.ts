import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../../shared/models/product.model';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-product-add-quantity',
  templateUrl: './product-add-quantity.component.html',
  styleUrls: ['./product-add-quantity.component.scss']
})
export class ProductAddQuantityComponent implements OnInit, OnDestroy {
  private product: Product;
  private saveProductSubscription: Subscription;

  public constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private router: Router
  ) {}

  public ngOnInit() {
    this.product = this.route.snapshot.data.product;
  }

  public ngOnDestroy() {
    if (this.saveProductSubscription) {
      this.saveProductSubscription.unsubscribe();
    }
  }

  public onUpdate(): void {
    this.product.count += 5;
    this.saveProductSubscription = this.productService
      .saveProduct(this.product)
      .subscribe(resp => {
        this.router.navigate(this.getBackUrl());
      });
  }

  public onCancel(): void {
    this.router.navigate(this.getBackUrl());
  }

  public getBackUrl(): string[] {
    return this.route.snapshot.parent.url.map((urlSegment: UrlSegment) => {
      return urlSegment.path;
    });
  }
}
