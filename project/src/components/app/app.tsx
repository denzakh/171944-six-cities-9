import {useState, useEffect} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Preloader from '../preloader/preloader';
import MainPage from '../main-page/main-page';
import Page404 from '../page404/page404';
import LoginPage from '../login-page/login-page';
import FavoritesPage from '../favorites-page/favorites-page';
import RoomPage from '../room-page/room-page';
import {checkAuthAction} from '../../store/api-actions';
import PrivateRoute from '../private-route/private-route';
import NoAuthRoute from '../no-auth-route/no-auth-route';
import {onCardItemHoverType, activeCardStateType} from '../../types/functions';
import {useAppDispatch, useAppSelector} from '../../hooks/';
import {AppRoute} from '../../constants/constants';

const initialActiveCardState:activeCardStateType = {
  id: undefined,
};

function App(): JSX.Element {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);


  const [activeCardState, setSelectedPointId] = useState(initialActiveCardState);
  const onCardItemHover: onCardItemHoverType = (newActiveCardState) => setSelectedPointId(newActiveCardState);

  const isLoading = useAppSelector((state) => state.isLoading);

  return (
    <>
      {isLoading && <Preloader />}
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route
            index element={
              <MainPage
                selectedPointId={activeCardState.id}
                onCardItemHover={onCardItemHover}
              />
            }
          />
          <Route
            path={AppRoute.Login}
            element={
              <NoAuthRoute>
                <LoginPage />
              </NoAuthRoute>
            }
          />
          <Route path={AppRoute.RoomRoute} element={<RoomPage />} />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route path='*' element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
