import { createAction, props } from '@ngrx/store';
import { UserState } from './user.state';

export const UserActions = {
  SET_USER: createAction('[User] Set User', props<{ user: UserState }>()),
};
