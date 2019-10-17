import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { RoutesRef } from 'src/app/shared/models/routes-ref.model';
import { Product } from '../../../shared/models/product.model';
import { ProductsService } from '../../../services/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.scss']
})
export class ProductDeleteComponent implements OnInit, OnDestroy {
  private product: Product;
  private deleteProductSubscription: Subscription;

  public constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private router: Router
  ) {}

  public ngOnInit() {
    this.product = this.route.snapshot.data.product;
  }

  public ngOnDestroy() {
    if (this.deleteProductSubscription) {
      this.deleteProductSubscription.unsubscribe();
    }
  }

  public onDelete(): void {
    this.deleteProductSubscription = this.productService
      .deleteProduct(this.product)
      .subscribe(resp => {
        this.router.navigate([RoutesRef.products]);
        this.productService.getOnDeleteSubject().next(this.product);
      });
  }

  public onCancel(): void {
    const backUrl = this.route.snapshot.parent.url.map(
      (urlSegment: UrlSegment) => {
        return urlSegment.path;
      }
    );
    this.router.navigate(backUrl);
  }
}
