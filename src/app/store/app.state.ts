import { AuthState } from './auth';
import { ProductState } from './product';
import { UserState } from './user';
import { UsersState } from './users';

export interface AppState {
  auth: AuthState;
  user: UserState;
  users: UsersState[];
  product: ProductState[];
}
