import { createAction, props } from '@ngrx/store';
import { OrdersState } from './orders.state';

export const ordersActions = {
  SET_ORDERS_LIST: createAction('[Orders] Set Orders list', props<{ ordersList: OrdersState[] }>()),
};
