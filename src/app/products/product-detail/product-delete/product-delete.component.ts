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
  product: Product;
  RoutesRef = RoutesRef;
  private deleteProductSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.product = this.route.snapshot.data.product;
  }

  ngOnDestroy() {
    if (this.deleteProductSubscription) {
      this.deleteProductSubscription.unsubscribe();
    }
  }

  onDelete() {
    this.deleteProductSubscription = this.productService
      .deleteProduct(this.product)
      .subscribe((resp) => {
        this.router.navigate([RoutesRef.products]);
        this.productService.getOnDeleteSubject().next(this.product);
      });
  }

  onCancel() {
    const backUrl = this.route.snapshot.parent.url.map(
      (urlSegment: UrlSegment) => {
        return urlSegment.path;
      }
    );
    this.router.navigate(backUrl);
  }
}
