
import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import RoomContent from '../room-content/room-content';
import {fetchRoom, fetchNearby, fetchComments} from '../../store/api-actions';
import {useAppSelector} from '../../hooks/';
import {useAppDispatch} from '../../hooks/';
import OfferType from '../../types/offer';
import CommentType from '../../types/comment';

function isEmptyObj(obj: Record<string, unknown>): boolean {
  return Object.keys(obj).length === 0;
}

function RoomPage(): JSX.Element | null {

  const {id} = useParams();
  const activeOffer = useAppSelector((state) => state.activeOffer) as OfferType;
  const activeNearby = useAppSelector((state) => state.nearby) as OfferType[];
  const comments = useAppSelector((state) => state.comments) as CommentType[];
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRoom({id}));
    dispatch(fetchNearby({id}));
    dispatch(fetchComments({id}));
  }, [dispatch, id]);

  if(isEmptyObj(activeOffer)) {
    return null;
  } else {
    return <RoomContent activeOffer={activeOffer} activeNearby={activeNearby} comments={comments} hotelId={id} />;
  }
}
export default RoomPage;
