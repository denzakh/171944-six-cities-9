import {useSearchParams} from 'react-router-dom';
import classNames from 'classnames';
import NavUser from '../nav-user/nav-user';
import OfferType from '../../types/offer';
import LogoLink from '../logo-link/logo-link';
import Cities from '../cities/cities';
import CitiesPlaces from '../cities-places/cities-places';
import CitiesEmpty from '../cities-empty/cities-empty';
import {DEFAULT_CITY} from '../../constants/cities';
import {onCardItemHoverType} from '../../types/functions';
import {addOffers, changeActiveCity} from '../../store/action';
import {useAppDispatch, useAppSelector} from '../../hooks/';

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
  selectedPointId: number | undefined,
  onCardItemHover: onCardItemHoverType,
}

function MainPage(props:MainPageProps): JSX.Element {

  const {offers, selectedPointId, onCardItemHover} = props;

  const dispatch = useAppDispatch();
  dispatch(addOffers());

  const [searchParams] = useSearchParams();
  const activeCityParams = searchParams.get('city') || DEFAULT_CITY;
  dispatch(changeActiveCity({activeCity: activeCityParams}));

  const activeCity = useAppSelector((state) => state.activeCity);
  const filteredOffers = offers.filter((offer) => offer.city.name === activeCity);

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
