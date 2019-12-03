import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on
} from '@ngrx/store';
import { PaginationLinks } from 'src/app/models/pagination-links.model';
import { Product } from 'src/app/models/product.model';
import * as ProductsActions from '../store/products.actions';

export interface ProductsState {
  productsList: Product[];
  paginationLinks: PaginationLinks;
  productInteractionType: number | null;
  currentProduct: Product;
  currentProductCategory: string;
}

export const getProductsState = createFeatureSelector<ProductsState>(
  'productsState'
);

export const getProductsList = createSelector(
  getProductsState,
  state => state.productsList
);

export const getCurrentProduct = createSelector(
  getProductsState,
  state => state.currentProduct
);

export const getPaginationLinks = createSelector(
  getProductsState,
  state => state.paginationLinks
);

export const getProductInteractionType = createSelector(
  getProductsState,
  state => state.productInteractionType
);

export const getCurrentProductCategory = createSelector(
  getProductsState,
  state => state.currentProductCategory
);

const initialState: ProductsState = {
  productsList: [],
  paginationLinks: new PaginationLinks(),
  productInteractionType: null,
  currentProduct: null,
  currentProductCategory: ''
};

export function productsReducer(
  productsState: ProductsState | undefined,
  productsAction: Action
) {
  return createReducer(
    initialState,
    on(ProductsActions.setProductsList, (state, action) => ({
      ...state,
      productsList: [...action.productsList]
    })),
    on(ProductsActions.setCurrentProduct, (state, action) => ({
      ...state,
      currentProduct: { ...action.product }
    })),
    on(ProductsActions.setCurrentProductCategory, (state, action) => ({
      ...state,
      currentProductCategory: action.category
    })),
    on(ProductsActions.setPaginationLinks, (state, action) => ({
      ...state,
      paginationLinks: { ...action.paginationLinks }
    }))
  )(productsState, productsAction);
}
