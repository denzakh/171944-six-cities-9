import {memo} from 'react';
import PlaceCard from '../place-card/place-card';
import OfferType from '../../types/offer';
import {AppRoute} from '../../constants/constants';
import {onCardItemHoverType} from '../../types/functions';

type CardListProps = {
  offers: OfferType[],
  onCardItemHover?: onCardItemHoverType,
  favoriteCb?: ()=> void,
};

function CardList(props: CardListProps): JSX.Element {

  const {offers, onCardItemHover, favoriteCb} = props;

  const cards = offers.map((offer) => (
    <PlaceCard
      key={offer.id}
      offer={offer}
      url={`${AppRoute.Room}/${offer.id}`}
      onMouseEnter={()=>onCardItemHover && onCardItemHover({id: offer.id})}
      onMouseLeave={()=>onCardItemHover && onCardItemHover({id: undefined})}
      favoriteCb={favoriteCb}
    />
  ));

  return <div className="cities__places-list places__list tabs__content">{cards}</div>;
}

export default memo(CardList, (prevProps: CardListProps, nextProps: CardListProps) => {

  function isOffersEqual(prevOffers: OfferType[], nextOffers: OfferType[]): boolean {
    if(prevOffers !== nextOffers) {
      return false;
    }

    return prevOffers.every((prevItem, index: number)=>(
      prevItem.id === nextOffers[index].id &&
      prevItem.isFavorite === nextOffers[index].isFavorite
    ));
  }

  return isOffersEqual(prevProps.offers, nextProps.offers);
});

export const CardListPure = CardList;
