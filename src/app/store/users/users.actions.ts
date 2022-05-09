import { createAction, props } from '@ngrx/store';
import { UsersState } from './users.state';

export const usersActions = {
  SET_USERS_LIST: createAction('[Users] Set Users list', props<{ usersList: UsersState[] }>()),
};
