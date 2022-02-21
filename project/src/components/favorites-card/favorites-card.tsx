import {Link} from 'react-router-dom';
import OfferType from '../../types/offer';

type FavoritesCardPropsType = {
  offer: OfferType,
  url: string,
}

function FavoritesCard(props: FavoritesCardPropsType): JSX.Element {
  const {
    isPremium,
    previewImage,
  } = props.offer;

  const url = props.url;

  return (
    <article className="favorites__card place-card">
      {!!isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={url}>
          <img
            className="place-card__image"
            src={previewImage}
            alt="Place"
            width={150}
            height={100}
          />
        </Link>
      </div>
    </article>
  );
}
export default FavoritesCard;
