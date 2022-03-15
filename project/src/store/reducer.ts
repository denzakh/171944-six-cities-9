import {createReducer} from '@reduxjs/toolkit';
import offers from '../mocks/offers';
import OfferType from '../types/offer';
import {DEFAULT_CITY} from '../constants/cities';
import CityNameType from '../types/cityName';
import {changeActiveCity, addOffers} from './action';
import cities from '../constants/cities';

type initialStateType = {
  activeCity: CityNameType,
  offers: OfferType[] | never[],
}

const initialState: initialStateType = {
  activeCity: DEFAULT_CITY,
  offers: [],
};

function isCity(city: string): city is CityNameType {
  return cities.includes(city as CityNameType);
}

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeActiveCity, (state, action) => {
      if(isCity(action.payload.activeCity)) {
        state.activeCity = action.payload.activeCity;
      } else {
        state.activeCity = DEFAULT_CITY;
      }
    })
    .addCase(addOffers, (state) => {
      state.offers = offers;
    });
});

export {reducer};
