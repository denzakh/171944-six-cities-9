import {createAction} from '@reduxjs/toolkit';

export const addOffers = createAction('ADD_OFFERS');

export const changeActiveCity = createAction<{activeCity: string}>('CHANGE_ACTIVE_CITY');

