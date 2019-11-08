import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/shared/models/product.model';
import { PaginationLinks } from 'src/app/shared/models/pagination-links.model';

export const setProductsList = createAction(
  '[Products] Set Products List',
  props<{ productsList: Product[] }>()
);

export const fetchProducts = createAction(
  '[Products] Fetch Products',
  props<{ params: { [s: string]: any } }>()
);

export const setCurrentProduct = createAction(
  '[Products] Set Current Product',
  props<{ product: Product }>()
);

export const setCurrentProductCategory = createAction(
  '[Products] Set Current Product Category',
  props<{ category: string }>()
);

export const fetchCurrentProductCategory = createAction(
  '[Products] Fetch Current Product Category',
  props<{ product: Product }>()
);

export const fetchCurrentProduct = createAction(
  '[Products] Fetch Current Product',
  props<{ productId: number }>()
);

export const saveCurrentProduct = createAction(
  '[Products] Save Current Product',
  props<{ product: Product }>()
);

export const deleteCurrentProduct = createAction(
  '[Products] Delete Current Product',
  props<{ product: Product }>()
);

export const setPaginationLinks = createAction(
  '[Products] Set Pagination Links',
  props<{ paginationLinks: PaginationLinks }>()
);

export const redirectToProductsHP = createAction(
  '[Products] Redirects To Products Home Page'
);
