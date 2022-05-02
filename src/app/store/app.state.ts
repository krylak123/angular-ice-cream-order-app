import { AuthState } from './auth';
import { ProductState } from './product';
import { UserState } from './user';

export interface AppState {
  auth: AuthState;
  user: UserState;
  product: ProductState[];
}
