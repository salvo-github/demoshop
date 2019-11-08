import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import * as ProductsActions from '../products/store/products.actions';
import { AppState } from '../reducer';

@Injectable({ providedIn: 'root' })
export class ProductDetailResolver implements Resolve<void> {
  constructor(private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    const paramProductId = parseFloat(
      route.paramMap.get('id') || route.parent.paramMap.get('id')
    );

    this.store.dispatch(
      ProductsActions.fetchCurrentProduct({ productId: paramProductId })
    );
  }
}
