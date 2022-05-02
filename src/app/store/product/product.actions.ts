import { createAction, props } from '@ngrx/store';
import { ProductState } from './product.state';

export const productActions = {
  SET_PRODUCT_LIST: createAction('[Product] Set product list', props<{ res: ProductState[] }>()),
};
