import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../tools/constants';
import MainPage from '../main-page/main-page';
import Page404 from '../page404/page404';
import LoginPage from '../login-page/login-page';
import FavoritesPage from '../favorites-page/favorites-page';
import RoomPage from '../room-page/room-page';
import PrivateRoute from '../private-route/private-route';

type AppProps = {
  cardCount:number
};

function App(props:AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage cardCount={props.cardCount} />} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.RoomRoute} element={<RoomPage />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <FavoritesPage/>
            </PrivateRoute>
          }
        />
        <Route path='*' element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
