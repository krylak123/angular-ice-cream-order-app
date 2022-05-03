import { createReducer, on } from '@ngrx/store';
import { UnitsActions } from './units.actions';
import { UnitsState } from './units.state';

const initialState: UnitsState[] = [];

export const unitsReducer = createReducer(
  initialState,
  on(UnitsActions.SET_UNITS_LIST, (_, props) => {
    return [...props.unitsList];
  })
);
