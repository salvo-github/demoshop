import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductsService } from '../products.service';
import { Product } from '../product.model';

@Injectable({ providedIn: 'root' })
export class ProductsListResolver implements Resolve<Product[] | []> {
  constructor(private productsService: ProductsService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product[] | []> {
    return this.productsService.fetchProducts().pipe(
      catchError((err) => {
        return of([]);
      })
    );
  }
}
