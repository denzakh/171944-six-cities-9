import PlaceCard from '../place-card/place-card';
import OfferType from '../../types/offer';
import {AppRoute} from '../../constants/constants';
import {useState} from 'react';

type CardListProps = {
  offers: OfferType[],
};

function CardList(props: CardListProps): JSX.Element {
  const [, setActiveId] = useState('');

  const handleEnter = (id: string): void => {
    setActiveId(id);
  };

  const handleLeave = (): void => {
    setActiveId('');
  };

  const cards = props.offers.map((offer) => (
    <PlaceCard
      key={offer.id}
      offer={offer}
      url={`${AppRoute.Room}/${offer.id}`}
      onMouseEnter={()=>(handleEnter(String(offer.id)))}
      onMouseLeave={handleLeave}
    />
  ));

  return <div className="cities__places-list places__list tabs__content">{cards}</div>;
}
export default CardList;
