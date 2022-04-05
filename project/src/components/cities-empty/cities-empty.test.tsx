import {render, screen} from '@testing-library/react';
import CitiesEmpty from './cities-empty';
import CityNameType from '../../types/cityName';

describe('Component: CitiesEmpty', () => {

  it('should render correctly', () => {
    const activeCity: CityNameType = 'Brussels';
    const expectText = 'We could not find any property available at the moment in Brussels';

    render(
      <CitiesEmpty activeCity={activeCity} />,
    );

    expect(screen.getByText(expectText)).toBeInTheDocument();
  });
});
