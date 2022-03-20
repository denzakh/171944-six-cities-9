import {createReducer} from '@reduxjs/toolkit';
import OfferType from '../types/offer';
import CommentType from '../types/comment';
import {addOffers, requireAuthorization, setOffer, setLoading, setNearby, setComments} from './action';
import {AuthorizationStatus} from '../constants/constants';

type initialStateType = {
  offers: OfferType[],
  authorizationStatus: AuthorizationStatus,
  activeOffer: Record<string, unknown>,
  isLoading: false | true,
  nearby: OfferType[],
  comments: CommentType[],
}

const initialState: initialStateType = {
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  activeOffer: {},
  isLoading: false,
  nearby: [],
  comments: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addOffers, (state, action) => {
      state.offers = action.payload.offers;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setOffer, (state, action) => {
      state.activeOffer = action.payload.activeOffer;
    })
    .addCase(setLoading, (state, action) => {
      state.isLoading = action.payload.isLoading;
    })
    .addCase(setNearby, (state, action) => {
      state.nearby = action.payload.nearby;
    })
    .addCase(setComments, (state, action) => {
      state.comments = action.payload.comments;
    });
});

export {reducer};
