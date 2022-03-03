import NavUser from '../nav-user/nav-user';
import FavoritesList from '../favorites-list/favorites-list';
import OfferType from '../../types/offer';
import LogoLink from '../logo-link/logo-link';

type FavoritesPageProps = {
  offers: OfferType[],
}

function FavoritesPage(props:FavoritesPageProps): JSX.Element {

  const {offers} = props;

  return (
    <div className="page">
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
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesList offers={offers} />
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33} />
        </a>
      </footer>
    </div>
  );
}
export default FavoritesPage;
