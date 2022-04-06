import FavoritesCard from '../place-card/place-card';
import Offer from '../../types/offer';
import {AppRoute} from '../../constants/constants';
import {citiesObj} from '../../constants/cities';

type CitiesType = {
  [locationName: string]: {
    [cityId: string]: Offer,
  },
}
type FavoritesListPropsType = {
  offers: Offer[],
}

function FavoritesList(props: FavoritesListPropsType): JSX.Element {

  const {offers} = props;
  const cities: CitiesType = {...{}, ...citiesObj};

  offers.forEach((offer: Offer): void => {
    if(offer.isFavorite) {
      cities[offer.city.name] = {...cities[offer.city.name], [offer.id]: offer};
    }
  });

  return (
    <ul className="favorites__list">
      {Object.entries(cities).map(([location, cardList]) =>
        Object.entries(cardList).length > 0 && (
          <li className="favorites__locations-items" key={location}>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href={`/?city=${location}`}>
                  <span>{location}</span>
                </a>
              </div>
            </div>
            <div className="favorites__places">
              {Object.entries(cardList).map(([id, offer]) =>(
                <FavoritesCard
                  key={offer.title}
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
