import {
  ProductsState,
  PRODUCTS_STATE_KEY
} from './products/store/products.reducer';

export interface AppState {
  [PRODUCTS_STATE_KEY]: ProductsState;
}
