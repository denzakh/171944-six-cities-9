import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import OfferType from '../types/offer';
import CommentType from '../types/comment';
import {addOffers, setOffer, setNearby, setComments, setFavorites, setLoading} from './data-slice/data-slice';
import {successAuthorization, failAuthorization} from './user-slice/user-slice';
import {redirectToRoute} from './action';
import {saveToken, dropToken} from '../services/token';
import {APIRoute, AppRoute} from '../constants/constants';
import {AuthData, RoomData, SubmitCommentData, FavoriteData} from '../types/data';
import {UserData} from '../types/user-data';
import {errorHandle} from '../services/error-handle';
import {AppDispatch, State} from '../types/store';

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'USER/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(successAuthorization());
    } catch (error) {
      dispatch(failAuthorization());
      errorHandle(error);
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'USER/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    try {
      const res = await api.post<UserData>(APIRoute.Login, {email, password});
      const token = res.data.token;
      saveToken(token);
      dispatch(successAuthorization());
      dispatch(redirectToRoute(AppRoute.Main));
    } catch(error) {
      dispatch(failAuthorization());
      errorHandle(error);
    }
  },
);

export const logoutAction =  createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'USER/logout',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      dispatch(failAuthorization());
    } catch(error) {
      errorHandle(error);
    }
  },
);

export const fetchOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'DATA/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    try {
      dispatch(setLoading({isLoading: true}));
      const {data} = await api.get<OfferType[]>(APIRoute.Offers);
      dispatch(addOffers({offers: data}));
      dispatch(setLoading({isLoading: false}));
    } catch (error) {
      errorHandle(error);
      dispatch(setLoading({isLoading: false}));
    }
  },
);

export const fetchRoom =  createAsyncThunk<void, {id: number}, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'DATA/fetchRoom',
  async ({id}, {dispatch, extra: api}) => {
    try {
      dispatch(setLoading({isLoading: true}));
      dispatch(setOffer({activeOffer: {}}));
      const res = await api.get<RoomData>(`${APIRoute.Offer}/${id}`);
      const activeOffer = res.data as unknown as OfferType;
      dispatch(setOffer({activeOffer: activeOffer}));
      dispatch(setLoading({isLoading: false}));
    } catch(error) {
      dispatch(setLoading({isLoading: false}));
      dispatch(redirectToRoute(AppRoute.Page404));
      errorHandle(error);
    }
  },
);

export const fetchNearby =  createAsyncThunk<void, {id: number}, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'DATA/fetchNearby',
  async ({id}, {dispatch, extra: api}) => {
    try {
      const res = await api.get<OfferType[]>(`${APIRoute.Offer}/${id}/nearby`);

      if(res.data) {
        dispatch(setNearby({nearby: res.data}));
      }

    } catch(error) {
      errorHandle(error);
    }
  },
);

export const fetchComments = createAsyncThunk<void, {id: number}, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'DATA/fetchComments',
  async ({id}, {dispatch, extra: api}) => {
    try {
      const res = await api.get<CommentType[]>(`${APIRoute.Comments}/${id}`);

      if(res.data) {
        dispatch(setComments({comments: res.data}));
      }
    } catch(error) {
      errorHandle(error);
    }
  },
);

export const submitComment = createAsyncThunk<void, SubmitCommentData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'DATA/submitComment',
  async ({comment, rating, hotelId, cb}, {dispatch, extra: api}) => {
    try {
      dispatch(setLoading({isLoading: true}));
      const res = await api.post<CommentType[]>(`${APIRoute.Comments}/${hotelId}`, {comment, rating});

      if(res.data) {
        dispatch(setComments({comments: res.data}));
        cb();
      }
      dispatch(setLoading({isLoading: false}));
    } catch(error) {
      errorHandle(error);
      dispatch(setLoading({isLoading: false}));
    }
  },
);

export const fetchFavorites =  createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'DATA/fetchFavorites',
  async (_arg, {dispatch, extra: api}) => {
    try {
      dispatch(setLoading({isLoading: true}));
      const {data} = await api.get<OfferType[]>(APIRoute.Favorite);
      dispatch(setFavorites({favorites: data}));
      dispatch(setLoading({isLoading: false}));
    } catch (error) {
      errorHandle(error);
      dispatch(setLoading({isLoading: false}));
    }
  },
);

export const changeFavorite = createAsyncThunk<void, FavoriteData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'DATA/changeFavorite',
  async ({hotelId, status, cb}, {dispatch, extra: api}) => {
    try {
      const res = await api.post<OfferType>(`${APIRoute.Favorite}/${hotelId}/${status}`);

      const resultText = status ?
        'offer added to favorites' :
        'offer removed from favorites';

      if(res.data) {
        toast.info(resultText);
        dispatch(fetchOffers());
        dispatch(fetchFavorites());
        if(cb) {
          cb();
        }
      }

    } catch(error) {
      errorHandle(error);
    }
  },
);
