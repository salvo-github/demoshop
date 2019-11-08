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
export class ProductsListResolver implements Resolve<void> {
  constructor(private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    const params: { [s: string]: any } = {};
    for (const key of route.queryParamMap.keys) {
      params[key] = route.queryParamMap.get(key);
    }

    this.store.dispatch(ProductsActions.fetchProducts({ params }));
    return;
  }
}
