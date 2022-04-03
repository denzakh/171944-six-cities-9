import {Routes, Route} from 'react-router-dom';
import HistoryRouter from '../history-router/history-router';
import {createMemoryHistory, History} from 'history';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cities from './cities';
import CityNameType from '../../types/cityName';

const renderCities = (history: History, city: CityNameType) => {
  render(
    <HistoryRouter history={history}>
      <Routes>
        <Route
          path={'/'}
          element={<Cities activeCity={city} />}
        />
      </Routes>
    </HistoryRouter>,
  );
};

const history = createMemoryHistory();

describe('Component: BookmarkContent', () => {
  beforeEach(() => {
    history.push('/');
  });

  it('should render correctly', () => {
    const activeCity = 'Paris';
    const activeClassName = 'tabs__item--active';

    const checkCitiesRendering = (nodes: HTMLElement[]) => nodes.every((node) => {
      const cityName = node.childNodes[0].textContent;
      const nodeClass = node.className;
      const isNodeClassActive = nodeClass.includes(activeClassName);
      return cityName === activeCity ? isNodeClassActive : !isNodeClassActive;
    });

    renderCities(history, activeCity);

    const cityElList = screen.getAllByTestId('city');

    expect(checkCitiesRendering(cityElList)).toBeTruthy();
  });

  it('should navigate correctly', () => {
    const activeCity = 'Paris';
    const nextCity = 'Amsterdam';

    renderCities(history, activeCity);

    const nextCityElement = screen.getByTitle(nextCity);
    userEvent.click(nextCityElement);

    expect(history.location.search).toBe(`?city=${nextCity}`);
  });
});
