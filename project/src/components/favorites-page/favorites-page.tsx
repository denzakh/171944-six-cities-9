import {Link} from 'react-router-dom';
import {useEffect} from 'react';
import classNames from 'classnames';
import NavUser from '../nav-user/nav-user';
import FavoritesList from '../favorites-list/favorites-list';
import LogoLink from '../logo-link/logo-link';
import {useAppSelector, useAppDispatch} from '../../hooks/';
import {fetchFavorites} from '../../store/api-actions';
import Offer from '../../types/offer';

function FavoritesPage(): JSX.Element {

  const offers = useAppSelector<Offer[]>((state) => state.favorites);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  function getPageClassName(isEmpty: boolean): string {
    return classNames({
      'page': true,
      'page--favorites-empty': isEmpty,
    });
  }

  return (
    <div className={getPageClassName(offers.length === 0)}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <LogoLink />
            </div>
            <NavUser />
          </div>
        </div>
      </header>
      {offers.length ?
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoritesList offers={offers} />
            </section>
          </div>
        </main> :
        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          </div>
        </main>}

      <footer className="footer container">
        <Link to="/" className="footer__logo-link">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33} />
        </Link>
      </footer>
    </div>
  );
}
export default FavoritesPage;
