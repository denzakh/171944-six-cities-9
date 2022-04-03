import {store} from '../store/index';
import OfferType from '../types/offer';
import CommentType from '../types/comment';
import {AuthorizationStatus} from '../constants/constants';

export type UserStateType = {
  authorizationStatus: AuthorizationStatus
};

export type DataStateType = {
  offers: OfferType[],
  activeOffer: Record<string, unknown>,
  isLoading: false | true,
  nearby: OfferType[],
  comments: CommentType[],
  favorites: OfferType[],
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
