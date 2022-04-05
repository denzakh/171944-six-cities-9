import {render, screen} from '@testing-library/react';
import Preloader from './preloader';

describe('Component: Preloader', () => {

  it('should render correctly', () => {

    render(
      <Preloader  />,
    );

    expect(screen.getByTestId('preloader')).toBeInTheDocument();
  });
});
