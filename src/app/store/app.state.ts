import { AuthState } from './auth';
import { UserState } from './user';
import { UsersState } from './users';
import { UnitsState } from './units';
import { ProductState } from './product';
import { OrdersState } from './orders';

export interface AppState {
  auth: AuthState;
  user: UserState;
  users: UsersState[];
  units: UnitsState[];
  product: ProductState[];
  orders: OrdersState[];
}
