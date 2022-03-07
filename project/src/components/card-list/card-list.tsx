import PlaceCard from '../place-card/place-card';
import OfferType from '../../types/offer';
import {AppRoute} from '../../constants/constants';
import {onCardItemHoverType} from '../../types/functions';

type CardListProps = {
  offers: OfferType[],
  onCardItemHover?: onCardItemHoverType,
};

function CardList(props: CardListProps): JSX.Element {
  const {offers, onCardItemHover} = props;

  const cards = offers.map((offer) => (
    <PlaceCard
      key={offer.id}
      offer={offer}
      url={`${AppRoute.Room}/${offer.id}`}
      onMouseEnter={()=>onCardItemHover && onCardItemHover({id: offer.id})}
      onMouseLeave={()=>onCardItemHover && onCardItemHover({id: undefined})}
    />
  ));

  return <div className="cities__places-list places__list tabs__content">{cards}</div>;
}
export default CardList;