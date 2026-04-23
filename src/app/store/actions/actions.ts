import { createAction, props } from '@ngrx/store';
import { UserModel } from '../../models/user-model';

export const saveUserData= createAction('User saved', props<{ user: UserModel }>());