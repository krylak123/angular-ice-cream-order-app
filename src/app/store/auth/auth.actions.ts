import { createAction } from '@ngrx/store';

export const AuthActions = {
  SET_AUTHENTICATED: createAction('[Auth] Set Authenticated'),
  SET_UNAUTHENTICATED: createAction('[Auth] Set Unauthenticated'),
};
