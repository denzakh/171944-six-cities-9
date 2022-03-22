import {createReducer} from '@reduxjs/toolkit';
import OfferType from '../types/offer';
import {addOffers, requireAuthorization, setOffer, setLoading} from './action';
import {AuthorizationStatus} from '../constants/constants';

type initialStateType = {
  offers: OfferType[],
  authorizationStatus: AuthorizationStatus,
  activeOffer: Record<string, unknown>,
  isLoading: false | true,
}

const initialState: initialStateType = {
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  activeOffer: {},
  isLoading: false,
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
    });
});

export {reducer};
