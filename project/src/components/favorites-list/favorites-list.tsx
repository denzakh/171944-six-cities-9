import FavoritesCard from '../place-card/place-card';
import OfferType from '../../types/offer';
import {AppRoute} from '../../tools/constants';

type FavoritesListProps = {
  offers: OfferType[],
};

function FavoritesList(props: FavoritesListProps): JSX.Element {
  const {offers} = props;
  let locationList: string[] = offers.map((offer)=>offer.city.name);
  locationList = Array.from(new Set(locationList));

  return (
    <ul className="favorites__list">
      {locationList.map((location)=>{
        const cardList = offers.filter((offer)=>(offer.city.name === location));
        return (
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
        );
      })}
    </ul>
  );
}
export default FavoritesList;
