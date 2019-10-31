import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on
} from '@ngrx/store';
import { Product } from 'src/app/shared/models/product.model';
import * as ProductsActions from '../store/products.actions';

export interface ProductsState {
  productsList: Product[];
}

export const getProductsState = createFeatureSelector<ProductsState>(
  'productsState'
);

export const getProductsList = createSelector(
  getProductsState,
  state => state.productsList
);

const initialState: ProductsState = { productsList: [] };

export function productsReducer(
  productsState: ProductsState | undefined,
  productsAction: Action
) {
  return createReducer(
    initialState,
    on(ProductsActions.setProductsList, (state, action) => ({
      ...state,
      productsList: [...action.productsList]
    }))
  )(productsState, productsAction);
}
