import { AuthState } from './auth';
import { ProductState } from './product';
import { UnitsState } from './units';
import { UserState } from './user';

export interface AppState {
  auth: AuthState;
  user: UserState;
  users: UnitsState[];
  product: ProductState[];
}
