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
    const valuesForFiltering: { [s: string]: any } = {};
    for (const key of route.queryParamMap.keys) {
      valuesForFiltering[key] = route.queryParamMap.get(key);
    }

    return this.productsService.fetchProducts(valuesForFiltering).pipe(
      catchError((err) => {
        return of([]);
      })
    );
  }
}
