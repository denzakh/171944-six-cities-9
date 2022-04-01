import {createAction} from '@reduxjs/toolkit';
import {AppRoute, AuthorizationStatus} from '../constants/constants';
import OfferType from '../types/offer';
import CommentType from '../types/comment';

export const addOffers = createAction<{offers: OfferType[]}>('data/loadOffers');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setOffer = createAction<{activeOffer: Record<string, unknown>}>('data/setOffer');

export const setLoading = createAction<{isLoading: true | false}>('data/setLoading');

export const setNearby = createAction<{nearby: OfferType[]}>('data/setNearby');

export const setComments = createAction<{comments: CommentType[]}>('data/setComments');

export const redirectToRoute = createAction<AppRoute>('route/redirectToRoute');

export const setFavorites = createAction<{favorites: OfferType[]}>('data/loadFavorites');
