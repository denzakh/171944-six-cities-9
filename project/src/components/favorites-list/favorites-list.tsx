import FavoritesCard from '../place-card/place-card';
import Offer from '../../types/offer';
import {AppRoute} from '../../constants/constants';
import CityNameType from '../../types/cityName';

type FavoritesListProps = {
  offers: Offer[],
};

type Sum = {
  [propertyName: string]: Offer[],
}

type sumInitialType = {
  [propertyName: string]: Array<never>,
}

const sumInitial:sumInitialType = {
  'Paris': [],
  'Cologne': [],
  'Brussels': [],
  'Amsterdam': [],
  'Hamburg': [],
  'Dusseldorf': [],
};

function FavoritesList(props: FavoritesListProps): JSX.Element {
  const {offers} = props;

  const cities = offers.reduce(
    (sum:Sum, offer: Offer)=>{
      const cityName: CityNameType = offer.city.name;
      sum[cityName].push(offer);
      return sum;
    },
    sumInitial,
  );

  return (
    <ul className="favorites__list">
      {Object.entries(cities).map(([location, cardList])=>(
        <li className="favorites__locations-items" key={location}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href={`/?city=${location}`}>
                <span>{location}</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {cardList.map((offer)=>(
              <FavoritesCard
                key={offer.id}
                offer={offer}
                url={`${AppRoute.Room}/${offer.id}`}
              />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
export default FavoritesList;
