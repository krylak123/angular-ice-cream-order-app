import { OrderList } from '@features/new-order/new-order.service';

export interface OrdersState {
  email: string;
  order: OrderList[];
}
