import {createReducer} from '@reduxjs/toolkit';
import offers from '../mocks/offers';
import OfferType from '../types/offer';
import {addOffers} from './action';

type initialStateType = {
  offers: OfferType[],
}

const initialState: initialStateType = {
  offers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addOffers, (state) => {
      state.offers = offers;
    });
});

export {reducer};
