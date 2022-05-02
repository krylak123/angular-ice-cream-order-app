import { createAction, props } from '@ngrx/store';
import { UnitsState } from './units.state';

export const UnitsActions = {
  SET_USERS_LIST: createAction('[Users] Set Users list', props<{ usersList: UnitsState[] }>()),
};
