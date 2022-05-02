import { createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { UserState } from './user.state';

const initialState: UserState = {
  uid: '',
  role: '',
  name: '',
  surname: '',
  email: '',
  phone: '',
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.SET_USER, (state, props) => {
    return {
      ...state,
      uid: props.user?.uid,
      role: props.user?.role,
      name: props.user?.name,
      surname: props.user?.surname,
      email: props.user?.email,
      phone: props.user?.phone,
      favoriteIceCream: props.user?.favoriteIceCream,
      currentOrder: props.user?.currentOrder,
      prevOrder: props.user?.prevOrder,
    };
  })
);
