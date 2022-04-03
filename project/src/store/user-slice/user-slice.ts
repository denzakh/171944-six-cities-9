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
    successAuthorization: (state) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
    },
    failAuthorization: (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    },
  },
});

export const {successAuthorization, failAuthorization} = UserSlice.actions;
