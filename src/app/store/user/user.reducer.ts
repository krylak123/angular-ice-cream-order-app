import { createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { UserState } from './user.state';

const initialState: UserState = {
  key: '',
  data: {},
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.SET_USER, (state, props) => {
    return {
      ...state,
      key: props.user.key,
      data: props.user.data,
    };
  })
);
