import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Injectable({ providedIn: 'root' })
export class ProductCardResolver implements Resolve<Product | null> {
  constructor(
    private productService: ProductsService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product | null> {
    return this.productService.fetchProduct(+route.paramMap.get('id')).pipe(
      tap((productData) => {
        console.log(productData);
      }),
      catchError((err) => {
        return of(null);
      })
    );
  }
}
