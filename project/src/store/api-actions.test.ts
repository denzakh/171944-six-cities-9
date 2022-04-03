import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {FavoriteData} from '../types/data';
import {checkAuthAction, loginAction, logoutAction, fetchOffers, fetchRoom, fetchNearby,  submitComment, fetchFavorites, changeFavorite} from './api-actions';
import {addOffers, setOffer, setNearby, setComments, setFavorites} from './data-slice/data-slice';
import {successAuthorization, failAuthorization} from './user-slice/user-slice';
import {APIRoute} from '../constants/constants';
import {State} from '../types/store';
import {offers, comments} from '../utils/mocs';


const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const id = 10;

const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

describe('Async USER actions', () => {
  it('checkAuthAction (200): should to send Success authorization action when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(successAuthorization.toString());
  });


  it('checkAuthAction (400): should to send Fail authorization action when server return 400', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(400, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(failAuthorization.toString());

  });


  it('loginAction (200): should to send Success authorization action and Redirect when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, {token: 'token'});

    expect(store.getActions()).toEqual([]);

    await store.dispatch(loginAction({login:'test@test.ru', password: 'a111'}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(successAuthorization.toString());
    expect(actions).toContain('ROUTE/redirectToRoute');
  });


  it('loginAction (200): should to set Token in local storage when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, {token: 'token'});
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction({login:'test@test.ru', password: 'a111'}));

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('six-cities-token', 'token');
  });


  it('loginAction (400): should to send Fail authorization action when server return 400', async () => {
    const store = mockStore();
    mockAPI
      .onPost(APIRoute.Login)
      .reply(400, {});

    expect(store.getActions()).toEqual([]);

    await store.dispatch(loginAction({login:'test@test.ru', password: 'a111'}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(failAuthorization.toString());
  });


  it('logoutAction (exit 200): should to send Fail authorization action when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(failAuthorization.toString());
  });

});


describe('Async DATA actions', () => {

  it('fetchOffers (200): actions should contains addOffers when server return offers', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Offers)
      .reply(200, offers);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchOffers());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(addOffers.toString());
  });


  it('fetchRoom (200): actions should contains addOffers when server return offers', async () => {
    const store = mockStore();
    mockAPI
      .onGet(`${APIRoute.Offer}/${id}`)
      .reply(200, offers[0]);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchRoom({id}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(setOffer.toString());
  });


  it('fetchNearby (200): actions should contains setNearby when server return nearby', async () => {
    const store = mockStore();
    mockAPI
      .onGet(`${APIRoute.Offer}/${id}/nearby`)
      .reply(200, offers.slice(0,3));

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchNearby({id}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(setNearby.toString());
  });


  it('fetchComments (200): actions should contains setComments when server return comments', async () => {
    const store = mockStore();
    mockAPI
      .onGet(`${APIRoute.Comments}/${id}`)
      .reply(200, comments);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(setComments({id}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(setComments.toString());
  });


  it('submitComment (200): actions should contains setComment when server return 200', async () => {
    const store = mockStore();
    const fakeSubmitCommentData = {
      comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      rating: 20,
      hotelId: id,
      cb: jest.fn(),
    };
    mockAPI
      .onPost(`${APIRoute.Comments}/${id}`)
      .reply(200, {comments: comments});

    await store.dispatch(submitComment(fakeSubmitCommentData));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(setComments.toString());
    expect(fakeSubmitCommentData.cb).toBeCalled();
  });


  it('fetchFavorites (200): actions should contains setFavorites when server return favorites', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, comments);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchFavorites());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(setFavorites.toString());
  });


  it('changeFavorite (200): actions should contains fetchOffers and fetchFavorites when server return 200', async () => {
    const store = mockStore();
    const fakeSubmitFavoriteDate = {
      hotelId: id,
      status: 1,
      cb: jest.fn(),
    } as FavoriteData;
    mockAPI
      .onPost(`${APIRoute.Favorite}/${id}/1`)
      .reply(200, {});

    await store.dispatch(changeFavorite(fakeSubmitFavoriteDate));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(addOffers.toString());
    expect(actions).toContain(setFavorites.toString());
    expect(fakeSubmitFavoriteDate.cb).toBeCalled();
  });
});
