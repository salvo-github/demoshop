import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Injectable({ providedIn: 'root' })
export class ProductDetailResolver implements Resolve<Product | null> {
  constructor(private productService: ProductsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Product | Observable<Product | null> {
    const currentProduct = this.productService.getCurrentProduct();
    const paramProductId = +(
      route.paramMap.get('id') || route.parent.paramMap.get('id')
    );

    if (currentProduct !== undefined && paramProductId === currentProduct.id) {
      return currentProduct;
    } else {
      return this.productService.fetchProduct(paramProductId).pipe(
        catchError((err) => {
          return of(null);
        })
      );
    }
  }
}
