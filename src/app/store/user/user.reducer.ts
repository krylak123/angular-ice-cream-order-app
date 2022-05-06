import { createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { UserState } from './user.state';

const initialState: UserState = {
  key: '',
  data: {
    name: '',
    surname: '',
    email: '',
    phone: '',
    role: '',
    favoriteIceCream: [],
    currentOrder: {
      date: '',
      orderList: [],
    },
    prevOrder: {
      date: '',
      orderList: [],
    },
  },
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.SET_USER, (state, props) => {
    return {
      ...state,
      key: props.user.key,
      data: {
        currentOrder: {
          date: '',
          orderList: [],
        },
        prevOrder: {
          date: '',
          orderList: [],
        },
        ...props.user.data,
      },
    };
  })
);
