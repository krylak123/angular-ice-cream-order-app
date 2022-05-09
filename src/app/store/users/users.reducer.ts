import { createReducer, on } from '@ngrx/store';
import { usersActions } from './users.actions';
import { UsersState } from './users.state';

const initialState: UsersState[] = [];

export const usersReducer = createReducer(
  initialState,
  on(usersActions.SET_USERS_LIST, (_, props) => {
    return [...props.usersList];
  })
);
