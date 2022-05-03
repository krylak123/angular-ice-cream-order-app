import { createAction, props } from '@ngrx/store';
import { UnitsState } from './units.state';

export const UnitsActions = {
  SET_UNITS_LIST: createAction('[Units] Set Units list', props<{ unitsList: UnitsState[] }>()),
};
