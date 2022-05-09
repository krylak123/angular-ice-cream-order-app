import { createReducer, on } from '@ngrx/store';
import { ordersActions } from './orders.actions';
import { OrdersState } from './orders.state';

const initialState: OrdersState[] = [];

export const ordersReducer = createReducer(
  initialState,
  on(ordersActions.SET_ORDERS_LIST, (_, props) => {
    return [...props.ordersList];
  })
);
