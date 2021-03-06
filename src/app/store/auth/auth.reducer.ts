import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { AuthState } from './auth.state';

const initialState: AuthState = {
  isAuth: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.SET_AUTHENTICATED, state => {
    return {
      ...state,
      isAuth: true,
    };
  }),
  on(AuthActions.SET_UNAUTHENTICATED, state => {
    return {
      ...state,
      isAuth: false,
    };
  })
);
