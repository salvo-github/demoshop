import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/shared/models/product.model';

export const setProductsList = createAction(
  '[Products] Set Products List',
  props<{ productsList: Product[] }>()
);

export const fetchProducts = createAction('[Products] Fetch Products');
