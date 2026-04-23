import { createSelector } from '@ngrx/store';
import { AppState } from '../state/state';
import { UserModel } from '../../models/user-model';

export const selectUser = (state : AppState) => state.userData;

export const getUserData= createSelector(selectUser, (state: UserModel) => state);