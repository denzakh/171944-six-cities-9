import {Link} from 'react-router-dom';
import classNames from 'classnames';
import OfferType from '../../types/offer';
import {RATING_WIDTH_MULTIPLIER} from '../../constants/constants';

type PlaceCardPropsType = {
  offer: OfferType,
  url: string,
  onMouseEnter?: ()=>void,
  onMouseLeave?: ()=>void,
}

function PlaceCard(props: PlaceCardPropsType): JSX.Element {
  const {
    isFavorite,
    isPremium,
    rating,
    type,
    previewImage,
    description,
    price,
  } = props.offer;

  const url = props.url;
  const width = `${rating * RATING_WIDTH_MULTIPLIER}%`;

  const btnClassName = classNames({
    'button': true,
    'place-card__bookmark-button': true,
    'place-card__bookmark-button--active': isFavorite,
  });

  const onMouseEnter = props.onMouseEnter;
  const onMouseLeave = props.onMouseLeave;

  return (
    <article
      className="cities__place-card place-card"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
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
            width={260}
            height={200}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button className={btnClassName} type="button">
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: width}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={url}>{description}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}
export default PlaceCard;
