import {createAsyncThunk} from '@reduxjs/toolkit';
import {api, store} from '../store';
import OfferType from '../types/offer';
import {addOffers, requireAuthorization} from './action';
import {saveToken, dropToken} from '../services/token';
import {APIRoute, AuthorizationStatus} from '../constants/constants';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';

export const fetchOffers = createAsyncThunk(
  'data/fetchOffers',
  async () => {
    const {data} = await api.get<OfferType[]>(APIRoute.Offers);
    store.dispatch(addOffers({offers: data}));
  },
);

export const checkAuthAction = createAsyncThunk(
  'user/checkAuth',
  async () => {
    await api.get(APIRoute.Login);
    store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
  },
);

export const loginAction = createAsyncThunk(
  'user/login',
  async ({login: email, password}: AuthData) => {
    /*eslint-disable */
    console.log(4);


    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    /*eslint-enable */
  },
);

export const logoutAction = createAsyncThunk(
  'user/logout',
  async () => {
    await api.delete(APIRoute.Logout);
    dropToken();
    store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
