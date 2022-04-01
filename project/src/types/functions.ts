import OfferType, {Point} from '../types/offer';

export type activeCardIdType = number | undefined;
export type activeCardStateType = {id:activeCardIdType};
export type onCardItemHoverType = (activeCardState:activeCardStateType) => void;
export type getPointsFromOffersType = (offers: OfferType[]) => Point[];
