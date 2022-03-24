import {createAction} from '@reduxjs/toolkit';
import {AuthorizationStatus} from '../constants/constants';
import OfferType from '../types/offer';

export const addOffers = createAction<{offers: OfferType[]}>('data/loadOffers');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setOffer = createAction<{activeOffer: Record<string, unknown>}>('data/setOffer');

export const setLoading = createAction<{isLoading: true | false}>('data/setLoading');
