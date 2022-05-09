import { createReducer, on } from '@ngrx/store';
import { productActions } from './product.actions';
import { ProductState } from './product.state';

const initialState: ProductState[] = [];

export const productReducer = createReducer(
  initialState,
  on(productActions.SET_PRODUCT_LIST, (_, props) => {
    return [...props.productList];
  })
);
