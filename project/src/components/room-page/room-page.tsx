import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import RoomContent from '../room-content/room-content';
import {fetchRoom, fetchNearby, fetchComments, changeFavorite} from '../../store/api-actions';
import {useAppSelector, useAppDispatch} from '../../hooks/';
import OfferType from '../../types/offer';
import CommentType from '../../types/comment';

function isEmptyObj(obj: Record<string, unknown>): boolean {
  return Object.keys(obj).length === 0;
}

function isIdNumber(id: number): boolean {
  return !isNaN(id);
}

function RoomPage(): JSX.Element | null {

  const activeOffer = useAppSelector((state) => state.activeOffer) as OfferType;
  const activeNearby = useAppSelector((state) => state.nearby) as OfferType[];
  const comments = useAppSelector((state) => state.comments) as CommentType[];
  const dispatch = useAppDispatch();

  const {id} = useParams();
  const numberId = Number(id);

  const reFetch = (): void => {
    if(isIdNumber(numberId)) {
      dispatch(fetchRoom({id: numberId}));
      dispatch(fetchNearby({id: numberId}));
      dispatch(fetchComments({id: numberId}));
    }
  };

  const handleFavorite = () => {
    const status = activeOffer.isFavorite ? 0 : 1;
    dispatch(changeFavorite({
      hotelId: numberId,
      status,
      cb: reFetch,
    }));
  };

  useEffect(() => {
    reFetch();
  }, []);

  if(!isIdNumber(numberId) || isEmptyObj(activeOffer)) {
    return null;
  } else {
    return (
      <RoomContent
        activeOffer={activeOffer}
        activeNearby={activeNearby}
        comments={comments}
        favoriteCb={reFetch}
        handleFavorite={handleFavorite}
      />
    );
  }
}
export default RoomPage;
