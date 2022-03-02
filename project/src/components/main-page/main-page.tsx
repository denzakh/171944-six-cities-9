import NavUser from '../nav-user/nav-user';
import OfferType from '../../types/offer';
import LogoLink from '../logo-link/logo-link';
import Cities from '../cities/cities';
import CityNameType from '../../types/cityName';
import CitiesPlaces from '../cities-places/cities-places';
import CitiesEmpty from '../cities-empty/cities-empty';
import {useSearchParams} from 'react-router-dom';
import classNames from 'classnames';

function getLinkClassName(isEmpty: boolean): string {
  return classNames({
    'page': true,
    'page--gray': true,
    'page--main': true,
    'page__main--index-empty': isEmpty,
  });
}

type MainPageProps = {
  offers: OfferType[],
}

type activeCityType = CityNameType | null;

function MainPage(props:MainPageProps): JSX.Element {
  let {offers} = props;

  const [searchParams] = useSearchParams();
  const activeCity = searchParams.get('city') as activeCityType;

  if(activeCity) {
    offers = offers.filter((offer) => offer.city.name === activeCity);
  }

  return (
    <div className={getLinkClassName(offers.length === 0)}>
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
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <Cities />
        </div>
        <div className="cities">
          {offers.length ?
            <CitiesPlaces offers={offers} activeCity={activeCity} /> :
            <CitiesEmpty activeCity={activeCity} />}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
