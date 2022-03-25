import {createAsyncThunk} from '@reduxjs/toolkit';
import {api, store} from '../store';
import OfferType from '../types/offer';
import CommentType from '../types/comment';
import {addOffers, requireAuthorization, setOffer, setNearby, setComments, redirectToRoute} from './action';
import {saveToken, dropToken} from '../services/token';
import {APIRoute, AppRoute, AuthorizationStatus} from '../constants/constants';
import {AuthData, RoomData, SubmitCommentData} from '../types/data';
import {UserData} from '../types/user-data';
import {errorHandle} from '../services/error-handle';
import {setLoading} from '../store/action';

export const fetchOffers = createAsyncThunk(
  'data/fetchOffers',
  async () => {
    try {
      store.dispatch(setLoading({isLoading: true}));
      const {data} = await api.get<OfferType[]>(APIRoute.Offers);
      store.dispatch(addOffers({offers: data}));
      store.dispatch(setLoading({isLoading: false}));
    } catch (error) {
      errorHandle(error);
      store.dispatch(setLoading({isLoading: false}));
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
      store.dispatch(redirectToRoute(AppRoute.Main));
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
      store.dispatch(setLoading({isLoading: false}));
      store.dispatch(redirectToRoute(AppRoute.Page404));
      errorHandle(error);
    }
  },
);

export const fetchNearby = createAsyncThunk(
  'data/fetchNearby',
  async ({id}: RoomData) => {
    try {
      store.dispatch(setNearby({nearby: []}));
      const res = await api.get<OfferType[]>(`${APIRoute.Offer}/${id}/nearby`);

      if(res.data) {
        store.dispatch(setNearby({nearby: res.data}));
      }

    } catch(error) {
      errorHandle(error);
    }
  },
);


export const fetchComments = createAsyncThunk(
  'data/fetchComments',
  async ({id}: RoomData) => {
    try {
      store.dispatch(setComments({comments: []}));
      const res = await api.get<CommentType[]>(`${APIRoute.Comments}/${id}`);

      if(res.data) {
        store.dispatch(setComments({comments: res.data}));
      }
    } catch(error) {
      errorHandle(error);
    }
  },
);


export const submitComment = createAsyncThunk(
  'user/login',
  async ({comment, rating, hotelId, cb}: SubmitCommentData) => {
    try {
      store.dispatch(setLoading({isLoading: true}));
      const res = await api.post<CommentType[]>(`${APIRoute.Comments}/${hotelId}`, {comment, rating});

      if(res.data) {
        store.dispatch(setComments({comments: res.data}));
        cb();
      }
      store.dispatch(setLoading({isLoading: false}));
    } catch(error) {
      errorHandle(error);
      store.dispatch(setLoading({isLoading: false}));
    }
  },
);
