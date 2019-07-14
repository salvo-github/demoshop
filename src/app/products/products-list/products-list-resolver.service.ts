import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Injectable({ providedIn: 'root' })
export class ProductsListResolver implements Resolve<Product[] | []> {
  constructor(private productsService: ProductsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product[] | []> {
    const queryParams: { [s: string]: any } = {};
    for (const key of route.queryParamMap.keys) {
      queryParams[key] = route.queryParamMap.get(key);
    }

    return this.productsService.fetchProducts(queryParams).pipe(
      catchError((err) => {
        return of([]);
      })
    );
  }
}
