import browserHistory from '../../browser-history';
import {Middleware} from 'redux';
import {reducer} from '../reducer';

type Reducer = ReturnType<typeof reducer>;
/*eslint-disable */
export const redirect: Middleware<unknown, Reducer>=
  (_store) =>
    (next) =>
      (action) => {
        console.dir(action.type);
        if (action.type === 'route/redirectToRoute') {

          browserHistory.push(action.payload);
        }

        return next(action);
      };
/*eslint-enable */
