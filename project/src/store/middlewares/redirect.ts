import browserHistory from '../../browser-history';
import {Middleware} from 'redux';
import {rootReducer} from '../root-reducer';

type RootReducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, RootReducer>=
  (_store) =>
    (next) =>
      (action) => {
        if (action.type === 'ROUTE/redirectToRoute') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };

