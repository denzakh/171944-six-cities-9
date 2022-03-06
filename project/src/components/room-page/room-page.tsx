import NavUser from '../nav-user/nav-user';
import LogoLink from '../logo-link/logo-link';
import offers from './../../mocks/offers';
import OfferType from '../../types/offer';
import comments from './../../mocks/comments';
import classNames from 'classnames';
import Form from '../form/form';
import {useParams, Navigate} from 'react-router-dom';
import CardList from '../card-list/card-list';
import Comment from '../comment/comment';

function RoomPage(): JSX.Element {

  const { id } = useParams();

  if(!id) {
    return <Navigate to='*' />;
  }

  const activeId = id ? Number(id) : 0;
  const activeOffer = offers.find((item:OfferType)=>item.id === activeId);

  if(!activeOffer) {
    return <Navigate to='*' />;
  } else {

    let filtredOffers:OfferType[] = offers.filter((offerItem:OfferType)=>(
      offerItem.city.name === activeOffer.city.name &&
      offerItem.id !== activeId
    ));
    filtredOffers = filtredOffers.slice(0, 3);

    const {
      images,
      title,
      isFavorite,
      isPremium,
      rating,
      type,
      description,
      price,
      bedrooms,
      maxAdults,
      goods,
      host,
    } = activeOffer;

    const {
      name,
      isPro,
      avatarUrl,
    } = host;

    const width = `${rating * 20}%`;

    const btnClassName = classNames({
      'button': true,
      'property__bookmark-button': true,
      'property__bookmark-button--active': isFavorite,
    });

    const avatarClassName = classNames({
      'property__avatar-wrapper': true,
      'user__avatar-wrapper': true,
      'property__avatar-wrapper--pro': isPro,
    });

    return (
      <div className="page">
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
        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {images.map((img:string)=>(
                  <div className="property__image-wrapper" key={img}>
                    <img className="property__image" src={img} alt="studio" />
                  </div>
                ))}
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {!!isPremium && (
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>
                )}
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {title}
                  </h1>
                  <button className={btnClassName} type="button">
                    <svg className="property__bookmark-icon" width={31} height={33}>
                      <use xlinkHref="#icon-bookmark" />
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: width}} />
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{rating}</span>
                </div>
                <ul className="property__features">

                  <li className="property__feature property__feature--entire">
                    {type}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">€{price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {goods.map((item)=>(
                      <li className="property__inside-item" key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className={avatarClassName}>
                      <img
                        className="property__avatar user__avatar"
                        src={avatarUrl}
                        width={74}
                        height={74}
                        alt="Host avatar"
                      />
                    </div>
                    <span className="property__user-name">
                      {name}
                    </span>
                    {isPro && (
                      <span className="property__user-status">
                        Pro
                      </span>
                    )}
                  </div>
                  <div className="property__description">
                    <p className="property__text">
                      {description}
                    </p>
                  </div>
                </div>
                <section className="property__reviews reviews">
                  <h2 className="reviews__title">Reviews ·
                    <span className="reviews__amount">
                      {comments.length}
                    </span>
                  </h2>
                  <ul className="reviews__list">
                    {comments.map((comment)=>(
                      <Comment comment={comment} key={comment.id} />
                    ))}
                  </ul>
                  <Form />
                </section>
              </div>
            </div>
            <section className="property__map map" />
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                <CardList offers={filtredOffers} />
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }
}

export default RoomPage;
