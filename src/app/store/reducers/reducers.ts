import { createReducer, on } from '@ngrx/store';
import { saveUserData } from '../actions/actions';
import { UserModel } from '../../models/user-model';

const initialState : UserModel = {
   "name": "",
   "emailId": "",
   "role": "",
   "password": ""
};

export const saveUserReducer= createReducer(initialState, on(saveUserData, (state, {user}) => 
    ({ ...user })));