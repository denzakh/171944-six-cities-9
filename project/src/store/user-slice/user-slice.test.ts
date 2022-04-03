import {UserSlice} from './user-slice';
import {AuthorizationStatus} from '../../constants/constants';
import {successAuthorization, failAuthorization} from './user-slice';

describe('Reducer: USER', () => {
  it('without additional parameters should return initial state', () => {
    expect(UserSlice.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({authorizationStatus: AuthorizationStatus.Unknown});
  });

  it('should update authorizationStatus to "AUTH"', () => {
    const state = {authorizationStatus: AuthorizationStatus.NoAuth};

    expect(UserSlice.reducer(state, successAuthorization))
      .toEqual({authorizationStatus: AuthorizationStatus.Auth});
  });

  it('should update authorizationStatus to "NO_AUTH"', () => {
    const state = {authorizationStatus: AuthorizationStatus.NoAuth};

    expect(UserSlice.reducer(state, failAuthorization))
      .toEqual({authorizationStatus: AuthorizationStatus.NoAuth});
  });
});
