import {createAction} from '@reduxjs/toolkit';
import {AuthorizationStatus} from '../constants/constants';
import OfferType from '../types/offer';

export const addOffers = createAction<{offers: OfferType[]}>('data/loadOffers');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
