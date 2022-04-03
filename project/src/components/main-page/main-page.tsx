import {useSearchParams} from 'react-router-dom';
import {useEffect} from 'react';
import classNames from 'classnames';
import NavUser from '../nav-user/nav-user';
import LogoLink from '../logo-link/logo-link';
import Cities from '../cities/cities';
import CitiesPlaces from '../cities-places/cities-places';
import CitiesEmpty from '../cities-empty/cities-empty';
import {useAppDispatch, useAppSelector} from '../../hooks/';
import CityNameType from '../../types/cityName';
import {DEFAULT_CITY} from '../../constants/cities';
import {onCardItemHoverType} from '../../types/functions';
import {fetchOffers} from '../../store/api-actions';
import cities from '../../constants/cities';

function getLinkClassName(isEmpty: boolean): string {
  return classNames({
    'page': true,
    'page--gray': true,
    'page--main': true,
    'page__main--index-empty': isEmpty,
  });
}

type MainPageProps = {
  selectedPointId: number | undefined,
  onCardItemHover: onCardItemHoverType,
}

function isCity(citiesArr: CityNameType[], city: string | null): city is CityNameType {
  return citiesArr.includes(city as CityNameType);
}

function MainPage(props: MainPageProps): JSX.Element {

  const {selectedPointId, onCardItemHover} = props;
  const {offers} = useAppSelector(({DATA}) => DATA);
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const activeCityParams = searchParams.get('city');
  const activeCity = isCity(cities, activeCityParams) ? activeCityParams : DEFAULT_CITY;

  const filteredOffers = offers.filter((offer) => offer.city.name === activeCity);

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  return (
    <div className={getLinkClassName(filteredOffers.length === 0)}>
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
          <Cities activeCity={activeCity} />
        </div>
        <div className="cities">
          {filteredOffers.length ?
            <CitiesPlaces
              offers={filteredOffers}
              activeCity={activeCity}
              selectedPointId={selectedPointId}
              onCardItemHover={onCardItemHover}
            /> :
            <CitiesEmpty activeCity={activeCity} />}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
