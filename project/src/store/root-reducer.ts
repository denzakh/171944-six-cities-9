import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../constants/constants';
import {UserSlice} from './user-slice/user-slice';
import {DataSlice} from './data-slice/data-slice';


export const rootReducer = combineReducers({
  [NameSpace.user]: UserSlice.reducer,
  [NameSpace.data]: DataSlice.reducer,
});
