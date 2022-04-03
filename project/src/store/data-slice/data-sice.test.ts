import {DataSlice} from './data-slice';
import {comments, offers} from '../../utils/mocs';
// import {NameSpace} from '../../constants/constants';
import {DataStateType} from '../../types/store';

const initialState: DataStateType = {
  offers: [],
  activeOffer: {},
  isLoading: false,
  nearby: [],
  comments: [],
  favorites: [],
};

const {addOffers, setOffer, setLoading, setNearby, setComments, setFavorites} = DataSlice.actions;

describe('Reducer: DataSlice', () => {
  it('without additional parameters should return initial state', () => {
    expect(DataSlice.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });
  it('addOffers should set offers in state', () => {
    const result = {...initialState, ...{offers}};

    expect(DataSlice.reducer(initialState, addOffers({offers})))
      .toEqual(result);
  });
  it('setOffer should set activeOffer in state', () => {
    const result = {...initialState, ...{activeOffer: offers[0]}};

    expect(DataSlice.reducer(initialState, setOffer({activeOffer: offers[0]})))
      .toEqual(result);
  });
  it('setLoading should set isLoading in state', () => {
    const result = {...initialState, ...{isLoading: true}};

    expect(DataSlice.reducer(initialState, setLoading({isLoading: true})))
      .toEqual(result);
  });
  it('setNearby should set nearby in state', () => {
    const nearbyOffers = offers.slice(0,3);
    const result = {...initialState, ...{nearby: nearbyOffers}};

    expect(DataSlice.reducer(initialState, setNearby({nearby: nearbyOffers})))
      .toEqual(result);
  });
  it('setComments should set comments in state', () => {
    const result = {...initialState, ...{comments}};

    expect(DataSlice.reducer(initialState, setComments({comments})))
      .toEqual(result);
  });
  it('setFavorites should set favorites in state', () => {
    const favorites = offers.filter((offer)=>offer.isFavorite);
    const result = {...initialState, ...{favorites}};

    expect(DataSlice.reducer(initialState, setFavorites({favorites})))
      .toEqual(result);
  });
});


