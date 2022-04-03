import {createAction} from '@reduxjs/toolkit';
import {AppRoute} from '../constants/constants';

export const redirectToRoute = createAction<AppRoute>('ROUTE/redirectToRoute');
