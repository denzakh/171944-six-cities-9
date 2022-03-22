
import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import RoomContent from '../room-content/room-content';
import {fetchRoom} from '../../store/api-actions';
import {useAppSelector} from '../../hooks/';
import {useAppDispatch} from '../../hooks/';
import OfferType from '../../types/offer';

function isEmptyObj(obj: Record<string, unknown>): boolean {
  return Object.keys(obj).length === 0;
}

function RoomPage(): JSX.Element | null {

  const activeOffer = useAppSelector((state) => state.activeOffer) as OfferType;
  const dispatch = useAppDispatch();
  const {id} = useParams();

  useEffect(() => {
    dispatch(fetchRoom({id}));
  }, [dispatch, id]);

  if(isEmptyObj(activeOffer)) {
    return null;
  } else {
    return <RoomContent activeOffer={activeOffer} />;
  }
}
export default RoomPage;
