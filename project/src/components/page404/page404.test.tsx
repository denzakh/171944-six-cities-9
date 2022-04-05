import {render, screen} from '@testing-library/react';
import Page404 from './page404';

describe('Component: Page404', () => {
  it('should render correctly', () => {

    render(
      <Page404 />,
    );

    expect(screen.getByText('Error 404')).toBeInTheDocument();
  });
});
