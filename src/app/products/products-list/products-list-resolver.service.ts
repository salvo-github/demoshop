import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductsService } from '../products.service';
import { Product } from '../product.model';

@Injectable({ providedIn: 'root' })
export class ProductsListResolver implements Resolve<Product[] | []> {
  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<Product[] | []> | Promise<Product[] | []> | Product[] | [] {
    return this.productsService.fetchProducts().pipe(
      catchError((err) => {
        return of([]);
      })
    );
  }
}
