import { createReducer, on } from '@ngrx/store';
import { UnitsActions } from './units.actions';
import { UnitsState } from './units.state';

const initialState: UnitsState[] = [];

export const usersReducer = createReducer(
  initialState,
  on(UnitsActions.SET_USERS_LIST, (_, props) => {
    return [...props.usersList];
  })
);
