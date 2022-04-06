
import {Routes, Route} from 'react-router-dom';
import thunk from 'redux-thunk';
import {createMemoryHistory, History} from 'history';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import FavoritesList from './favorites-list';
import OfferType from '../../types/offer';
import {offers} from '../../utils/mocs';

type FavoritesListPropsType = {
  offers: OfferType[],
}

const renderFavoritesList = (store: MockStore, history: History, props: FavoritesListPropsType) => {
  render (
    <Provider store={store}>
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path='*'
            element={<FavoritesList {...props} />}
          />
        </Routes>
      </HistoryRouter>
    </Provider>,
  );
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();
const store = mockStore({});

const favoriteOffers = offers.filter((item)=>item.isFavorite);
const favoritesListExpectlength = favoriteOffers.length;

const favoritesListProps = {
  offers: favoriteOffers,
};

describe('Component: FavoritesList', () => {
  describe('should render correctly', () => {

    it('props data', () => {
      renderFavoritesList(store, history, favoritesListProps);
      expect(screen.getAllByTestId('place-card').length).toBe(favoritesListExpectlength);
    });
  });
});
