import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, AuthorizationStatus} from '../../constants/constants';
import {UserStateType} from '../../types/store';

const initialState: UserStateType = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const UserSlice = createSlice({
  name: NameSpace.user,
  initialState,
  reducers: {
    requireAuthorization: (state, action) => {
      state.authorizationStatus = action.payload;
    },
  },
});

export const {requireAuthorization} = UserSlice.actions;
