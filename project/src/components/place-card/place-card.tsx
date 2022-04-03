import {Link} from 'react-router-dom';
import classNames from 'classnames';
import {useAppDispatch} from '../../hooks/';
import {changeFavorite} from '../../store/api-actions';
import OfferType from '../../types/offer';
import {RATING_WIDTH_MULTIPLIER} from '../../constants/constants';

type PlaceCardPropsType = {
  offer: OfferType,
  url: string,
  onMouseEnter?: ()=>void,
  onMouseLeave?: ()=>void,
  favoriteCb?: ()=> void,
}

function PlaceCard(props: PlaceCardPropsType): JSX.Element {
  const {
    id,
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

  const dispatch = useAppDispatch();

  const btnClassName = classNames({
    'button': true,
    'place-card__bookmark-button': true,
    'place-card__bookmark-button--active': isFavorite,
  });

  const onMouseEnter = props.onMouseEnter;
  const onMouseLeave = props.onMouseLeave;
  const favoriteCb = props.favoriteCb;

  const handleFavorite = () => {
    const status = isFavorite ? 0 : 1;
    dispatch(changeFavorite({
      hotelId: id,
      status,
      cb: favoriteCb,
    }));
  };

  return (
    <article
      className="cities__place-card place-card"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      data-testid="place-card"
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
          <button className={btnClassName} type="button" onClick={handleFavorite}>
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
