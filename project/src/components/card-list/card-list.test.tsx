
import {Routes, Route} from 'react-router-dom';
import thunk from 'redux-thunk';
import {createMemoryHistory, History} from 'history';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import {CardListPure} from './card-list';
import OfferType from '../../types/offer';
import {offers} from '../../utils/mocs';

type CardListPropsType = {
  offers: OfferType[],
  onCardItemHover?: ()=> void,
  favoriteCb?: ()=> void,
};

const cardListProps: CardListPropsType = {
  offers: offers,
  onCardItemHover: jest.fn(),
  favoriteCb: jest.fn(),
};

const renderCardList = (store: MockStore, history: History, props: CardListPropsType) => {
  render (
    <Provider store={store}>
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path='*'
            element={<CardListPure {...props} />}
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

describe('Component: CardList', () => {
  describe('should render correctly', () => {

    it('props data', () => {
      renderCardList(store, history, cardListProps);
      expect(screen.getAllByTestId('place-card').length).toBe(offers.length);
    });
  });
});
