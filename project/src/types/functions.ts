export type activeCardIdType = number | undefined;
export type activeCardStateType = {id:activeCardIdType};
export type onCardItemHoverType = (activeCardState:activeCardStateType) => void;
