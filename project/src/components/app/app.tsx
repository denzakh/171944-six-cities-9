import {useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MainPage from '../main-page/main-page';
import Page404 from '../page404/page404';
import LoginPage from '../login-page/login-page';
import FavoritesPage from '../favorites-page/favorites-page';
import RoomPage from '../room-page/room-page';
import {addOffers} from '../../store/action';
import PrivateRoute from '../private-route/private-route';
import {onCardItemHoverType, activeCardStateType} from '../../types/functions';
import {useAppDispatch, useAppSelector} from '../../hooks/';
import {AppRoute, AuthorizationStatus} from '../../constants/constants';

const initialActiveCardState:activeCardStateType = {
  id: undefined,
};

function App(): JSX.Element {

  const dispatch = useAppDispatch();
  dispatch(addOffers());

  const offers = useAppSelector((state) => state.offers);
  const [activeCardState, setSelectedPointId] = useState(initialActiveCardState);
  const onCardItemHover: onCardItemHoverType = (newActiveCardState) => setSelectedPointId(newActiveCardState);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index element={
            <MainPage
              offers={offers}
              selectedPointId={activeCardState.id}
              onCardItemHover={onCardItemHover}
            />
          }
        />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.RoomRoute} element={<RoomPage />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <FavoritesPage
                offers={offers}
              />
            </PrivateRoute>
          }
        />
        <Route path='*' element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
