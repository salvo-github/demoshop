import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { RoutesRef } from 'src/app/routes-ref.model';
import { Product } from '../../product.model';
import { ProductsService } from '../../products.service';
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

  protected onDelete() {
    this.deleteProductSubscription = this.productService
      .deleteProduct(this.product)
      .subscribe((resp) => {
        this.router.navigate([RoutesRef.products]);
        this.productService.getOnDeleteSubject().next(this.product);
      });
  }

  protected onCancel() {
    const backUrl = this.route.snapshot.parent.url.map(
      (urlSegment: UrlSegment) => {
        return urlSegment.path;
      }
    );
    this.router.navigate(backUrl);
  }
}
