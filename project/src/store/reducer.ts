import {createReducer} from '@reduxjs/toolkit';
import OfferType from '../types/offer';
import {addOffers, requireAuthorization} from './action';
import {AuthorizationStatus} from '../constants/constants';

type initialStateType = {
  offers: OfferType[],
  authorizationStatus: AuthorizationStatus,
}

const initialState: initialStateType = {
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addOffers, (state, action) => {
      state.offers = action.payload.offers;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });

});

export {reducer};
