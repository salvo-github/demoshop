import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/shared/models/product.model';
import * as ProductsActions from '../store/products.actions';

@Injectable()
export class ProductsEffects {
  fetchProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.fetchProducts),
      switchMap(() => {
        return this.productsService.fetchProducts().pipe(
          map((products: Product[]) => {
            return ProductsActions.setProductsList({ productsList: products });
          }),
          catchError(error => {
            return of(ProductsActions.setProductsList({ productsList: [] }));
          })
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}
}
