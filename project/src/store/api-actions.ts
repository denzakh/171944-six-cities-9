import {createAsyncThunk} from '@reduxjs/toolkit';
import {api, store} from '../store';
import OfferType from '../types/offer';
import {addOffers, requireAuthorization, setOffer} from './action';
import {saveToken, dropToken} from '../services/token';
import {APIRoute, AuthorizationStatus} from '../constants/constants';
import {AuthData, RoomData} from '../types/data';
import {UserData} from '../types/user-data';
import {errorHandle} from '../services/error-handle';
<<<<<<< HEAD
import {setLoading} from '../store/action';
=======
>>>>>>> master

export const fetchOffers = createAsyncThunk(
  'data/fetchOffers',
  async () => {
    try {
<<<<<<< HEAD
      store.dispatch(setLoading({isLoading: true}));
      const {data} = await api.get<OfferType[]>(APIRoute.Offers);
      store.dispatch(addOffers({offers: data}));
      store.dispatch(setLoading({isLoading: false}));
    } catch (error) {
      errorHandle(error);
      store.dispatch(setLoading({isLoading: false}));
=======
      const {data} = await api.get<OfferType[]>(APIRoute.Offers);
      store.dispatch(addOffers({offers: data}));
    } catch (error) {
      errorHandle(error);
>>>>>>> master
    }
  },
);

export const checkAuthAction = createAsyncThunk(
  'user/checkAuth',
  async () => {
    try {
      await api.get(APIRoute.Login);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const loginAction = createAsyncThunk(
  'user/login',
  async ({login: email, password}: AuthData) => {
    try {
      const res = await api.post<UserData>(APIRoute.Login, {email, password});
      const token = res.data.token;
      saveToken(token);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch(error) {
      errorHandle(error);
    }
  },
);

export const logoutAction = createAsyncThunk(
  'user/logout',
  async () => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    } catch(error) {
      errorHandle(error);
    }
<<<<<<< HEAD
  },
);

export const fetchRoom = createAsyncThunk(
  'data/fetchRoom',
  async ({id}: RoomData) => {
    try {
      store.dispatch(setLoading({isLoading: true}));
      store.dispatch(setOffer({activeOffer: {}}));
      const res = await api.get<RoomData>(`${APIRoute.Offer}/${id}`);
      const activeOffer = res.data as unknown as OfferType;
      store.dispatch(setOffer({activeOffer: activeOffer}));
      store.dispatch(setLoading({isLoading: false}));
    } catch(error) {
      errorHandle(error);
      store.dispatch(setLoading({isLoading: false}));
    }
=======
>>>>>>> master
  },
);
