import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../constants/constants';
import {DataStateType} from '../../types/store';

const initialState: DataStateType = {
  offers: [],
  activeOffer: {},
  isLoading: false,
  nearby: [],
  comments: [],
  favorites: [],
};

export const DataSlice = createSlice({
  name: NameSpace.data,
  initialState,
  reducers: {
    addOffers: (state, action) => {
      state.offers = action.payload.offers;
    },
    setOffer: (state, action) => {
      state.activeOffer = action.payload.activeOffer;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload.isLoading;
    },
    setNearby: (state, action) => {
      state.nearby = action.payload.nearby;
    },
    setComments: (state, action) => {
      state.comments = action.payload.comments;
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload.favorites;
    },
  },
});


export const {addOffers, setOffer, setLoading, setNearby, setComments, setFavorites} = DataSlice.actions;

