import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import * as ProductsActions from '../store/products.actions';

@Injectable()
export class ProductsEffects {
  fetchProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.fetchProducts),
      switchMap(action => {
        return this.productsService.fetchProducts(action.params).pipe(
          switchMap((responseData: HttpResponse<Product[]>) => {
            const paginationLinks = this.productsService.setPaginationLinks(
              responseData.headers.get('Link')
            );
            return [
              ProductsActions.setPaginationLinks({ paginationLinks }),
              ProductsActions.setProductsList({
                productsList: responseData.body as Product[]
              })
            ];
          }),
          catchError(error => {
            return of(ProductsActions.setProductsList({ productsList: [] }));
          })
        );
      })
    );
  });

  fetchCurrentProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.fetchCurrentProduct),
      switchMap(action => {
        return this.productsService.fetchProduct(action.productId).pipe(
          switchMap(product => {
            return [
              ProductsActions.setCurrentProduct({ product }),
              ProductsActions.fetchCurrentProductCategory({ product })
            ];
          }),
          catchError(error => {
            return of(
              ProductsActions.setCurrentProduct({ product: null }),
              ProductsActions.setCurrentProductCategory({ category: '' })
            );
          })
        );
      })
    );
  });

  fetchCurrentProductCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.fetchCurrentProductCategory),
      switchMap(action => {
        return this.productsService
          .fetchCategoryById(action.product.categoryId)
          .pipe(
            map((category: Category) => {
              return ProductsActions.setCurrentProductCategory({
                category: `${action.product.gender} / ${category.name}`
              });
            }),
            catchError(error => {
              return of(
                ProductsActions.setCurrentProductCategory({ category: '' })
              );
            })
          );
      })
    );
  });

  saveCurrentProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.saveCurrentProduct),
      switchMap(action => {
        return this.productsService.saveProduct(action.product).pipe(
          map(product => {
            return ProductsActions.fetchCurrentProduct({
              productId: product.id
            });
          }),
          catchError(error => {
            return EMPTY;
          })
        );
      })
    );
  });

  deleteCurrentProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.deleteCurrentProduct),
      switchMap(action => {
        return this.productsService.deleteProduct(action.product).pipe(
          switchMap(() => {
            return [
              ProductsActions.setCurrentProduct({ product: null }),
              ProductsActions.setCurrentProductCategory({ category: '' }),
              ProductsActions.redirectToProductsHP()
            ];
          }),
          catchError(error => {
            return EMPTY;
          })
        );
      })
    );
  });

  redirectToProductsHP$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActions.redirectToProductsHP),
        switchMap(() => this.router.navigate(['/products']))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
    private router: Router
  ) {}
}
